import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SkipAuth } from 'src/auth/SkipAuth';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @SkipAuth()
  @Get('read')
  findAll() {
    return this.roleService.findAll();
  }

  @SkipAuth()
  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
