import { Document } from 'mongoose';

export interface Vehicle extends Document {
  readonly name: string;
  readonly brand: string;
  readonly creationDate?: Date;
  readonly price: number;
}
