import { Document } from 'mongoose';

export interface Expense extends Document {
  readonly name: string;
  readonly price: number;
  readonly parcels: number;
  readonly payeeId: string;
  readonly intermediaryId: string;
  readonly intermediary: boolean;
  readonly dataPayment: Date;
  readonly slug: string;
}
