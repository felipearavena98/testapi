import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { UserSchema } from './schemas/user.schema';
import { RolModule } from 'src/rol/rol.module';


@Module({
  imports: [
    RolModule,
    MongooseModule.forFeature([
      {
        name: USER.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
