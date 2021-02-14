import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VehicleDocument = Vehicle & Document;

@Schema()
export class Vehicle {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  brand: string;

  @Prop()
  creationDate?: Date

  @Prop({ required: true })
  price: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);