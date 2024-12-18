import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { expensesProviders } from './expense.providers';

@Module({
  imports: [MongooseModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, ...expensesProviders],
})
export class ExpenseModule {}
