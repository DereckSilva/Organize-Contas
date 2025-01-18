import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Model } from 'mongoose';
import { Expense } from './interfaces/expense.interface';
import { InjectModel } from '@nestjs/mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SlugService } from 'src/slug/slug.service';
import { UserService } from 'src/user/user.service';
import { ErrorFoundUser, ErrorRemoveExpense } from 'src/errors/errors';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel('Expense') private readonly expenseModel: Model<Expense>,
    private readonly eventEmitter: EventEmitter2,
    private readonly slugService: SlugService,
    private readonly userService: UserService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const user = await this.userService.findOne(createExpenseDto.payeeId)[0];
    if (typeof user === 'undefined' || user == null) {
      throw new ErrorFoundUser();
    }

    createExpenseDto = {
      ...createExpenseDto,
      slug: this.slugService.createSlug(
        `${createExpenseDto.name} ${createExpenseDto.datePayment}`,
      ),
    };

    this.eventEmitter.emit('expense.created', createExpenseDto);
    const expense = (await new this.expenseModel(
      createExpenseDto,
    ).save()) as Expense;
    return [expense];
  }

  async findAll() {
    const expense = await this.expenseModel.find();
    if (expense.length === 0) {
      return [
        {
          message: 'Nenhuma conta foi cadastrada',
          statusCode: HttpStatus.NO_CONTENT,
          data: {},
        },
      ];
    }
    return expense;
  }

  async findOne(id: string) {
    const expense = (await this.expenseModel
      .findOne({ _id: id })
      .exec()) as Expense;
    return [expense];
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    const user = await this.userService.findOne(updateExpenseDto.payeeId);
    if (user.length === 0) {
      throw new ErrorFoundUser();
    }
    this.eventEmitter.emit('expense.updated', { id, updateExpenseDto });
    const expense = await this.expenseModel.updateOne(
      { id: id },
      {
        $set: {
          ...updateExpenseDto,
        },
      },
    );
    return [expense];
  }

  async remove(id: string) {
    try {
      await this.expenseModel.deleteOne({ _id: id });
      return true;
    } catch (error) {
      console.log(error);
      throw new ErrorRemoveExpense();
    }
  }
}
