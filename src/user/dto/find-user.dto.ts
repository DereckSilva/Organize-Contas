import { IsNotEmpty, Matches } from 'class-validator';

export class FindUserDto {
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'O e-mail precisa conter letras e números',
  })
  email: string;
}
