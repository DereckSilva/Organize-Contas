import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'O e-mail precisa conter letras e numeros',
  })
  email: string;

  @IsString({ message: 'Nova senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Nova senha é obrigatória' })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
  @MaxLength(15, { message: 'A senha precisa ter no máximo 15 caracteres' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9@])[a-zA-Z0-9@]+$/, {
    message:
      'A senha precisa conter letras maísculas, minúsculas, números e símbolos',
  })
  newPassword: string;

  @IsString({ message: 'Antiga senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Antiga senha é obrigatória' })
  @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
  @MaxLength(15, { message: 'A senha precisa ter no máximo 15 caracteres' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9@])[a-zA-Z0-9@]+$/, {
    message:
      'A senha precisa conter letras maísculas, minúsculas, números e símbolos',
  })
  oldPassword: string;
}
