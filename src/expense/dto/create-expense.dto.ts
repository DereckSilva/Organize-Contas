import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O preço é obrigatório' })
  price: number;

  @IsNotEmpty({ message: 'O número de parcelas é obrigatório' })
  parcels: number;

  payeeId: string;

  @IsNotEmpty({ message: 'A data de pagamento é obrigatória' })
  @IsDate()
  datePayment: Date;

  @IsNotEmpty({ message: 'O slug é obrigatório' })
  @IsString({ message: 'O slug deve ser uma string' })
  slug: string;
}
