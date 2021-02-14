import { NotFoundException, Res } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Vehicle } from './models/vehicle.model';
import { VehicleService } from './vehicle.service';
import { NewVehicleInput, VehiclesArgs } from './dto';

const pubSub = new PubSub();

@Resolver(of => Vehicle)
export class VehicleResolver {
  constructor(private readonly vehicleService: VehicleService) {}

  @Query(returns => Vehicle)
  async vehicle(@Args('id') id: string) {
    const vehicle = await this.vehicleService.findOneById(id);
    if (!vehicle) {
      throw new NotFoundException(id);
    }
    return vehicle;
  }

  @Query(returns => [Vehicle])
  vehicles(@Args() vehicleArgs: VehiclesArgs) {
    return this.vehicleService.findAll(vehicleArgs);
  }

  @Mutation(returns => Vehicle)
  async addVehicle(@Args('newVehicleData') newVehicleData: NewVehicleInput) {
    const vehicle = await this.vehicleService.create(newVehicleData);
    pubSub.publish('vehicleAdded', { vehicleAdded: vehicle });
    return vehicle;
  }

  @Mutation(returns => Boolean)
  async removeVehicle(@Args('id') id: string) {
    return this.vehicleService.remove(id);
  }

  @Subscription(returns => Vehicle)
  vehicleAdded() {
    return pubSub.asyncIterator('vehicleAdded');
  }
}
