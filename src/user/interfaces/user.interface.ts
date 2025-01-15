import { Document } from 'mongoose';

export interface User extends Document {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly recipients: Array<{
    name: string;
    price: number;
    parcels: number;
    payeeId: string;
    dataPayment: Date;
    intermediary: boolean;
  }>;
  readonly slug: string;
  readonly role: string;
}
