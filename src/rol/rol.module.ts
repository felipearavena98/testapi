import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RolSchema } from './schemas/rol.scheme';
import { ROL } from 'src/common/models/models';

@Module({
  controllers: [RolController],
  providers: [RolService],
  imports: [
    MongooseModule.forFeature([
      {
        name: ROL.name,
        schema: RolSchema
      }
    ])
  ],
  exports: [RolService]
})
export class RolModule { }
