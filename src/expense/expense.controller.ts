import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Sse,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';
import { Expense } from './interfaces/expense.interface';
import { AuthGuard } from 'src/auth/auth.guards';
import { ErrorEmptyIntermediary } from 'src/errors/errors';
import { UserController } from 'src/user/user.controller';

@UseGuards(AuthGuard)
@Controller('expense')
export class ExpenseController {
  constructor(
    private readonly expenseService: ExpenseService,
    private readonly eventEmitter: EventEmitter2,
    private readonly userController: UserController,
  ) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    const intermediaryIds = createExpenseDto.intermediaryIds.filter(
      (value) => value !== null || value !== undefined,
    );

    if (createExpenseDto.intermediary && intermediaryIds.length === 0) {
      throw new ErrorEmptyIntermediary();
    }

    for (const i of createExpenseDto.intermediaryIds) {
      const intermediaryId = createExpenseDto.intermediaryIds[i];
      const intermediary = await this.userController.findOne({
        intermediaryId,
      })[0];
      if (typeof intermediary === 'undefined' || intermediary == null) {
        const newUser = {
          name: createExpenseDto.name,
          email: createExpenseDto.email,
          password: createExpenseDto.password,
          recipients: createExpenseDto.recipients,
          slug: createExpenseDto.slug,
          role: createExpenseDto.role,
        };

        const newIntermediary = await this.userController.create(newUser);
        createExpenseDto.intermediaryIds.push(newIntermediary[0].data.id);
      }
    }
    const expense = await this.expenseService.create(createExpenseDto);
    return [
      {
        message: 'Conta criada com sucesso',
        statusCode: HttpStatus.CREATED,
        data: {
          name: expense[0].name,
          slug: expense[0].slug,
          price: expense[0].price,
          parcels: expense[0].parcels,
          intermediary: expense[0].intermediary,
          datePayment: expense[0].dataPayment,
        },
      },
    ];
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }

  @Sse()
  updatedExpense(): Observable<Expense> {
    return fromEvent(this.eventEmitter, 'expense.updated').pipe(
      map((data) => data as Expense),
    );
  }

  @Sse('created-expense')
  createdExpense(): Observable<Expense> {
    return fromEvent(this.eventEmitter, 'expense.created').pipe(
      map((data) => data as Expense),
    );
  }
}
