import { ApiProperty } from '@nestjs/swagger';
import { ExpenseModel } from 'src/api-docs/expense/model/expense.model';

export class UserModel {
  @ApiProperty({
    description: 'Nome do Usuário',
    example: 'Anderson Oliveira',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'andersonoliveira54@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Identificação única do usuário',
    example: 'anderson-oliveira-gmail-com',
  })
  slug: string;

  @ApiProperty({
    description: 'Função do usuário dentro do sistema',
    example: 'user',
  })
  role: string;

  @ApiProperty({
    description: 'Contas do usuário',
    type: [ExpenseModel],
  })
  recipients: ExpenseModel[];
}
