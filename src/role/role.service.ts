import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Api } from 'src/api/entities/api.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role: Role = new Role();
    role.description = createRoleDto.description;
    role.name = createRoleDto.name;
    role.apis = createRoleDto.apis;
    const savedRole = await this.roleRepository.save(role);
    return savedRole;
  }

  async findAll() {
    const roles = await this.roleRepository.find({
      relations: {
        apis: true,
        users: true,
      },
      order: {
        id: 'ASC',
      },
    });
    return roles;
  }

  async getModule() {
    const user: any = this.request.user;

    const roles = await this.roleRepository.find({
      where: { name: user.role },
      relations: {
        apis: true,
      },
      order: {
        id: 'ASC',
      },
    });
    // Create an array of all module names
    const allModules = roles.flatMap((role) =>
      role.apis.map((api) => api.module),
    );
    // Remove duplicates
    const uniqueModules = [...new Set(allModules)];

    return uniqueModules;
  }

  async findOne(id: number) {
    const roles = await this.roleRepository.findOne({
      where: {
        users: { id: id },
      },
      relations: {
        apis: true,
      },
      select: {
        apis: {
          endpoint: true,
          method: true,
        },
      },
    });

    return roles;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const existRole = await this.findOne(id);
    console.log(existRole);
    if (existRole) {
      const apis = updateRoleDto.apis;
      existRole.apis = apis;
      const updatedRole = await this.roleRepository.save(existRole);
      return updatedRole;
    } else {
      return existRole; // Return the existing response structure
    }
  }

  async remove(id: number) {
    const deleteResult = await this.roleRepository.delete(id);
    return {};
  }

  async getApis(userId: number) {
    const roles = await this.roleRepository.find({
      where: {
        users: { id: userId },
      },
      loadRelationIds: {
        relations: ['apis'],
      },
    });
    return roles;
  }
}
