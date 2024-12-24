import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get('one')
  @UsePipes(new ValidationPipe())
  findOne(@Body() user: FindUserDto) {
    return this.userService.findOne(user.email);
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.email, updateUserDto);
  }

  @Delete(':email')
  @UsePipes(new ValidationPipe())
  remove(@Param('email') email: FindUserDto) {
    return this.userService.remove(email.email);
  }
}
