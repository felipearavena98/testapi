import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRole } from 'src/common/interfaces/rol.interface';
import { ROL } from 'src/common/models/models';


@Injectable()
export class RolesGuardGuard implements CanActivate {

  constructor(
    @InjectModel(ROL.name)
    private roleModel: Model<IRole>,
    private readonly reflector: Reflector
  ) { }

  async canActivate(
    context: ExecutionContext,
  ) {

    const getRolMeta = this.reflector.get<string[]>('rol', context.getHandler())

    console.log('___', getRolMeta)

    const req = context.getArgByIndex(0)
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException()
    }

    const roles = await this.roleModel.find({ _id: { $in: user.rol } })

    const exist = roles.map((x: any) => {
      return x.name
    })

    if (!exist) {
      throw new UnauthorizedException();
    }

    // if (exist !== getRolMeta) {
    //   throw new UnauthorizedException();
    // }

    const isAllow = exist.some((rol) => getRolMeta.includes(rol))

    console.log('PERMITIR', isAllow)

    return isAllow;
  }

}
