import { Field, ID, Int, ObjectType, } from '@nestjs/graphql';

@ObjectType() 
export class Vehicle {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  brand: string;

  @Field({nullable: true})
  creationDate: Date;

  @Field(type => Int)
  price: number;
}