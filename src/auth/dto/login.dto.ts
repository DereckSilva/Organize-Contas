import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsString({ message: 'O e-mail precisa ser uma string' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'O e-mail precisa conter letras e numeros',
  })
  email: string;

  @IsString({ message: 'A senha precisa ser uma string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
  @MaxLength(15, { message: 'A senha precisa ter no máximo 15 caracteres' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9@])[a-zA-Z0-9@]+$/, {
    message:
      'A senha precisa conter letras maísculas, minúsculas, números e símbolos',
  })
  password: string;
}
