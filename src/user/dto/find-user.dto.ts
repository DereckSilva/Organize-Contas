import { IsOptional, IsString, Matches } from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'O e-mail precisa conter letras e números',
  })
  email?: string;

  @IsOptional()
  @IsString({ message: 'O id do terceiro deve ser uma string' })
  intermediaryId?: string;
}
