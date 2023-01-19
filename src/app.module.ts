import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { RolModule } from './rol/rol.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [

    ConfigModule.forRoot(),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'public')
    // }),

    MongooseModule.forRoot(
      process.env.MONGODB
    ),
    UserModule,
    RolModule,
    AuthModule,
  ]
})
export class AppModule { }
