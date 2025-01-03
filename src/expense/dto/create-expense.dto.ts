import { IsDate, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome da conta precisa ser uma string' })
  @MinLength(10, {
    message: 'A descrição da conta precisa ter no mínimo 10 caracteres',
  })
  name: string;

  @IsNotEmpty({ message: 'O preço é obrigatório' })
  price: number;

  @IsNotEmpty({ message: 'O número de parcelas é obrigatório' })
  parcels: number;

  payeeId: string;

  @IsNotEmpty({ message: 'A data de pagamento é obrigatória' })
  @IsDate()
  datePayment: Date;

  slug: string;
}
