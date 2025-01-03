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
  Sse,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { fromEvent, map, Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    const usuario = await this.userService.findOne(createUserDto.email);
    if (usuario.length > 0) {
      return [
        {
          message: 'Usuário já cadastrado',
          code: HttpStatus.FOUND,
          data: usuario,
        },
      ];
    }
    return {
      message: 'Usuário cadastrado com sucesso',
      code: HttpStatus.CREATED,
      data: await this.userService.create(createUserDto),
    };
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

  @Sse('updated-user')
  updatedUser(): Observable<User> {
    return fromEvent(this.eventEmitter, 'user.updated').pipe(
      map((data) => data as User),
    );
  }

  @Sse('created-user')
  createdUser(): Observable<User> {
    console.log('usuario criado');
    return fromEvent(this.eventEmitter, 'user.created').pipe(
      map((data) => data as User),
    );
  }
}
