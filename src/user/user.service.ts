import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SlugService } from 'src/slug/slug.service';
import { CryptHash } from 'src/CryptHash/crypt-hash.encrypt';

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
        slug: this.slugService.createSlug(createUserDto.email),
      };
      this.eventEmitter.emit('user.created', createUserDto);
      const user = await new this.userModel(createUserDto).save();
      return [user.name, user.email, user.slug];
    } catch (error) {
      console.log(error.message);
      return [
        {
          message: 'Houve um erro ao realizar a inserção do usuário',
          code: 400,
        },
      ];
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string) {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (user) {
        return [
          {
            name: user.name,
            email: user.email,
            slug: user.slug,
          },
        ];
      }
      return [];
    } catch (error) {
      console.log(error);
      return [
        {
          message: 'Houve um erro ao realizar a busca do usuário',
          code: 400,
        },
      ];
    }
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    this.eventEmitter.emit('user.updated', { email, updateUserDto });
    return `This action updates a #${email} user`;
  }

  remove(email: string) {
    return `This action removes a #${email} user`;
  }
}
