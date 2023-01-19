import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { JwtGuardGuard } from 'src/auth/guards/jwt-guard.guard';
import { RolesGuardGuard } from 'src/auth/guards/roles-guard.guard';
import { Rol } from 'src/auth/decorators/rol.decorator';

@Controller('rol')
export class RolController {
  constructor(private readonly rolService: RolService) { }

  @Post()
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.create(createRolDto);
  }

  @UseGuards(JwtGuardGuard, RolesGuardGuard)
  @Get()
  @Rol(['ASISTENTE'])
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.rolService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(id, updateRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolService.remove(+id);
  }
}
