import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewVehicleInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @MaxLength(30)
  brand: string;

  @Field({ nullable: true })
  creationDate?: Date;

  @Field(type => Int)
  price: number;
}
