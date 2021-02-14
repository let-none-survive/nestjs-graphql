import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { VehiclesModule } from './vehicles/vehicles.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    VehiclesModule,
    MongooseModule.forRoot('mongodb://localhost/vehicles')
  ],
})
export class AppModule {}