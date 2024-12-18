import { Mongoose } from 'mongoose';
import { ExpenseSchema } from './schemas/expense.schema';

export const expensesProviders = [
  {
    provide: 'EXPENSE_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Expense', ExpenseSchema),
    inject: [Mongoose],
  },
];
