import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewVehicleInput, VehiclesArgs } from './dto';
import { Vehicle } from './interfaces/vehicle.interface';
import {
  Vehicle as VehicleSchema,
  VehicleDocument,
} from './schemas/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(VehicleSchema.name)
    private vehiclesModel: Model<VehicleDocument>,
  ) {}
  async findOneById(id: string): Promise<Vehicle> {
    return this.vehiclesModel.findById(id);
  }

  async findAll(vehiclesArgs: VehiclesArgs): Promise<Vehicle[]> {
    return this.vehiclesModel
      .find({})
      .limit(vehiclesArgs.take)
      .skip(vehiclesArgs.skip);
  }

  async create(data: NewVehicleInput): Promise<Vehicle> {
    const createdVehicle = new this.vehiclesModel(data);
    return await createdVehicle.save();
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.vehiclesModel.findByIdAndRemove(id);
      return true;
    } catch {
      return false;
    }
  }
}
