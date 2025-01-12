import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SlugService } from 'src/slug/slug.service';
import { CryptHash } from 'src/CryptHash/crypt-hash.encrypt';
import {
  ErrorFoundUser,
  ErrorInsertUser,
  ErrorInvalidOldPassword,
  ErrorRemoveUser,
} from 'src/errors/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly eventEmitter: EventEmitter2,
    private readonly slugService: SlugService,
    private readonly cryptHash: CryptHash,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto = {
        ...createUserDto,
        password: await this.cryptHash.encryptPassword(createUserDto.password),
        slug: this.slugService.createSlug(
          `${createUserDto.name} ${createUserDto.email}`,
        ),
      };
      this.eventEmitter.emit('user.created', createUserDto);
      const user = await new this.userModel(createUserDto).save();
      return [
        {
          name: user.name,
          email: user.email,
          slug: user.slug,
          recipients: user.recipients,
        },
      ];
    } catch (error) {
      console.log(error.message);
      throw new ErrorInsertUser();
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string) {
    try {
      const user = (await this.userModel.findOne({ email }).exec()) as User;
      if (user) {
        return [user];
      }
      return [];
    } catch (error) {
      console.log(error);
      throw new ErrorFoundUser();
    }
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    this.eventEmitter.emit('user.updated', { email, updateUserDto });
    return `This action updates a #${email} user`;
  }

  async updatePassword(user: User, updatePassword: UpdatePasswordDto) {
    if (
      !(await this.cryptHash.comparePassword(
        updatePassword.oldPassword,
        user.password,
      ))
    ) {
      throw new ErrorInvalidOldPassword();
    }
    await this.userModel.updateOne(
      { id: user.id },
      {
        $set: {
          password: await this.cryptHash.encryptPassword(
            updatePassword.newPassword,
          ),
        },
      },
    );
    this.eventEmitter.emit('user.updated', updatePassword);
  }

  async remove(user: User) {
    try {
      await this.userModel.deleteOne({ _id: user.id });
      return true;
    } catch (error) {
      console.log(error);
      throw new ErrorRemoveUser();
    }
  }
}
