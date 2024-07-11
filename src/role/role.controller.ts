import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseMessage } from 'src/decorator/responseMessage.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ResponseMessage('Create new role')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ResponseMessage('Get roles')
  findAll() {
    return this.roleService.findAll();
  }

  @Get('module')
  @ResponseMessage('Get API permission')
  getModule() {
    return this.roleService.getModule();
  }

  @Get(':id')
  @ResponseMessage('Get role by id')
  findOne(@Param('id') id: string) {  
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Update role')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete role')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }

}
