import { Module } from '@nestjs/common';
import { DateScalar } from 'src/common/scalars/date.scalar';
import { VehicleService } from './vehicle.service';
import { VehicleResulver } from './vehicles.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Vehicle, VehicleSchema } from './schemas/vehicle.schema'
import { LoggingPlugin } from 'src/common/plugins/loggin.plugin';
import { ComplexityPlugin } from 'src/common/plugins/complexity.plugin';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Vehicle.name, schema: VehicleSchema
    }
  ])],
  providers: [
    VehicleResulver,
    VehicleService,
    DateScalar,
    // LoggingPlugin,
    // ComplexityPlugin,
  ],
})
export class VehiclesModule { }
