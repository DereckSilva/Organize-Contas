import { Prop } from '@nestjs/mongoose';
import {
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import mongoose from 'mongoose';
import { ExpenseSchema } from 'src/expense/schemas/expense.schema';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'O e-mail precisa conter letras e numeros',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
  @MaxLength(15, { message: 'A senha precisa ter no máximo 15 caracteres' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9@])[a-zA-Z0-9@]+$/, {
    message:
      'A senha precisa conter letras maísculas, minúsculas, números e símbolos',
  })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }] })
  recipients: (typeof ExpenseSchema)[];

  slug: string;

  @IsString({ message: 'A função precisa ser uma string' })
  @IsNotEmpty({ message: 'Necessário informar a função do usuário' })
  @IsIn(['user', 'admin'], { message: 'Função inválida' })
  role: string;
}
