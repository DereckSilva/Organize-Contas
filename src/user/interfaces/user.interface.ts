import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly recipients: Array<{
    name: string;
    price: number;
    parcels: number;
    payeeId: string;
    dataPayment: Date;
  }>;
  readonly slug: string;
}
