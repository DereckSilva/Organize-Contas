import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpenseSchema } from './schemas/expense.schema';
import { SlugService } from 'src/slug/slug.service';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/user/schemas/user.schema';
import { CryptHash } from 'src/CryptHash/crypt-hash.encrypt';
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [ExpenseController],
  providers: [
    ExpenseService,
    SlugService,
    UserService,
    CryptHash,
    UserController,
  ],
  exports: [ExpenseService],
})
export class ExpenseModule {}
