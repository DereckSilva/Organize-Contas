import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Model } from 'mongoose';
import { Expense } from './interfaces/expense.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel('Expense') private readonly expnseModel: Model<Expense>,
  ) {}

  create(createExpenseDto: CreateExpenseDto) {
    return 'This action adds a new expense';
  }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
