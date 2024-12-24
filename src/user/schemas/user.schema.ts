import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
  slug: [{ type: String, required: true, unique: true }],
});
