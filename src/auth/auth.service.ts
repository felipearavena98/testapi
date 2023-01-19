import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole } from 'src/common/interfaces/rol.interface';
import { IUser } from 'src/common/interfaces/user.interface';
import { USER } from 'src/common/models/models';
import { RolService } from 'src/rol/rol.service';

import { RegisterAuthDTO } from './dto/register-auth.dto';

import * as bcrypt from 'bcrypt';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(USER.name)
    private readonly userModel: Model<IUser>,
    private readonly rolModel: RolService,
    private readonly jwtService: JwtService
  ) { }


  async login(userLoginBody: LoginAuthDto) {

    const { password } = userLoginBody

    const userExist = await this.userModel.findOne({ rut: userLoginBody.rut })

    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)

    const isCheck = await compareHash(password, userExist.password)
    if (!isCheck) throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT)

    const userFlat = userExist.toObject()
    delete userFlat.password

    const payload = {
      id: userFlat._id
    }

    const token = this.jwtService.sign(payload)

    const data = {
      token,
      user: userFlat,
      success: true,
      message: 'Logueado'
    }


    return data;
  }


  async register(userBody: RegisterAuthDTO) {
    try {

      const { password, ...userData } = userBody;

      if (!userData.rol) {
        userData.rol = []
      } else {
        const role: IRole[] = [];
        for (const rol of userData.rol) {
          const p = await this.rolModel.findByName(rol.name)

          if (!p) {
            throw new ConflictException(`No existe el rol ${rol.name}`)
          }
          role.push(p)
        }

        userData.rol = role

      }

      const us = await this.userModel.create({
        ...userData,
        password: await generateHash(password)
      })

      return us.save()

    } catch (error) {
      console.log('error')
    }
  }

}
