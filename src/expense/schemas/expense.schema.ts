import * as mongoose from 'mongoose';

export const ExpenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  parcels: { type: Number, default: 1 },
  payeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  datePayment: { type: Date, required: true },
});
