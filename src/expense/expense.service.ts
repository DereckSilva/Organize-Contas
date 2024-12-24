import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Model } from 'mongoose';
import { Expense } from './interfaces/expense.interface';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel('Expense') private readonly expnseModel: Model<Expense>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  create(createExpenseDto: CreateExpenseDto) {
    this.eventEmitter.emit('expense.created', createExpenseDto);
    return 'This action adds a new expense';
  }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    this.eventEmitter.emit('expense.updated', { id, updateExpenseDto });
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
