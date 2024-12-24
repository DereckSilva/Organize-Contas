import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(email: string) {
    return `This action returns a #${email} user`;
  }

  update(email: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${email} user`;
  }

  remove(email: string) {
    return `This action removes a #${email} user`;
  }
}
