import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { IRole } from 'src/common/interfaces/rol.interface';
import { ROL } from 'src/common/models/models';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';


@Injectable()
export class RolService {

  constructor(
    @InjectModel(ROL.name)
    private readonly rolModel: Model<IRole>
  ) { }

  async create(createRolDto: CreateRolDto) {
    createRolDto.name = createRolDto.name.toLocaleUpperCase();

    try {
      const rol = await this.rolModel.create(createRolDto);
      return rol;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`This rol exist in db ${JSON.stringify(error.keyValue)}`)
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Rol - Check server Logs`)
    }


  }

  findAll() {
    return this.rolModel.find();
  }

  async findOne(term: string) {

    let rol: IRole;

    if (!rol && isValidObjectId(term)) {
      rol = await this.rolModel.findById(term);
    }

    if (!rol) {
      rol = await this.rolModel.findOne({ name: term.toLocaleUpperCase().trim() })
    }

    if (!rol) throw new NotFoundException(`Pokemon with id or name "${term}" not found`)

    return rol
  }


  async findByName(name: string) {
    if (name) {
      return await this.rolModel.findOne({ name })
    } else {
      return null;
    }
  }

  async findById(id: string) {
    if (id) {
      const rol = await this.rolModel.findById(id)
      return rol
    } else {
      return null;
    }
  }


  async update(id: string, updateRolDto: UpdateRolDto) {

    const rol = this.rolModel.findById({ id: id })
    if (updateRolDto.name)
      updateRolDto.name = updateRolDto.name.toLocaleUpperCase();

    await rol.updateOne(updateRolDto)

    return { ...(await rol).toJSON(), ...updateRolDto };
  }

  remove(id: number) {
    return `This action removes a #${id} rol`;
  }
}
