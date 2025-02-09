import { ApiProperty } from '@nestjs/swagger';

export class ExpenseModel {
  @ApiProperty({
    description: 'Nome da conta',
    example: 'Roupas Renner',
  })
  name: string;

  @ApiProperty({
    description: 'Preço da conta',
    example: 156,
  })
  price: number;

  @ApiProperty({
    description: 'Número de parcelas',
    example: 5,
  })
  parcels: number;

  @ApiProperty({
    description: 'Conta é divida entre mais pessoas?',
    example: true,
  })
  intermediary: boolean;
}
