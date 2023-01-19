import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole } from 'src/common/interfaces/rol.interface';
import { IUser } from 'src/common/interfaces/user.interface';
import { ROL, USER } from 'src/common/models/models';
import { RolService } from 'src/rol/rol.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(USER.name)
    private readonly userModel: Model<IUser>,
    private readonly rolModel: RolService
  ) { }

  async create(createUserDto: CreateUserDto) {

    try {

      const { password, ...userData } = createUserDto;

      if (!userData.rol) {
        userData.rol = []
      } else {
        const role: IRole[] = [];
        for (const rol of userData.rol) {
          const p = await this.rolModel.findById(rol._id)
          if (!p) {
            throw new ConflictException(`No existe el rol ${rol._id}`)
          }
          role.push(p)
        }

        userData.rol = role

      }

      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })

      return user.save()

    } catch (error) {
      console.log('error')
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
