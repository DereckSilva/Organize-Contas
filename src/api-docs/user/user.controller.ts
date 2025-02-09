import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserModel } from './model/user.model';
import { UpdatePasswordDto } from 'src/user/dto/update-password.dto';
import { ErrorFoundUser } from 'src/errors/errors';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um usuário.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuário criado com sucesso.',
    type: UserModel,
  })
  @UsePipes(new ValidationPipe())
  @UseGuards()
  async create(@Body() createUser: CreateUserDto) {
    return await this.userService.create(createUser);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Busca um usuário específico.' })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: 'Busca um usuário.',
    type: UserModel,
  })
  @UsePipes(new ValidationPipe())
  async findOne(@Param('email') email: string) {
    return await this.userService.findOne(email);
  }

  @Patch(':email')
  @ApiOperation({ summary: 'Atualiza os dados de um usuário.' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Atualiza os dados de um usuário.',
    type: UserModel,
  })
  @ApiBearerAuth()
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('email') email: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.userService.update(email, updateUser);
  }

  @Patch()
  @ApiOperation({ summary: 'Atualiza a senha do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Atualização realizada com sucesso',
  })
  @UsePipes(new ValidationPipe())
  async udatePassword(@Body() updatePassword: UpdatePasswordDto) {
    const user = await this.findOne(updatePassword.email);
    if (user.length === 0) {
      throw new ErrorFoundUser();
    }
    return await this.userService.updatePassword(user[0], updatePassword);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuário removido com sucesso',

    example: [
      {
        status: HttpStatus.OK,
        message: 'Usuário removido com sucesso',
        data: [],
      },
    ],
  })
  async remove(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (user.length === 0) {
      throw new ErrorFoundUser();
    }
    return await this.userService.remove(user[0]);
  }
}
