import { Module } from '@nestjs/common';
import { ExpenseService } from 'src/expense/expense.service';
import { SlugService } from 'src/slug/slug.service';
import { ExpenseController } from './expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from 'src/expense/schemas/expense.schema';
import { UserService } from 'src/user/user.service';
import { CryptHash } from 'src/CryptHash/crypt-hash.encrypt';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService, SlugService, UserService, CryptHash],
  exports: [],
})
export class ExpenseModule {}
