import { Inject, Injectable, BadRequestException } from '@nestjs/common';
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

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({
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

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const existRole = await this.findOne(id);
    if (existRole) {
      existRole.apis = existRole.apis.concat(updateRoleDto.apis);

      const isExist = await this.roleRepository.findOne({
        where: { name: updateRoleDto.name },
      });
      if (isExist) {
        throw new BadRequestException(`Name ${isExist.name} already exists`);
      }
      existRole.name = updateRoleDto.name;
      const updatedRole = await this.roleRepository.save(existRole);
      return updatedRole;
    } else {
      throw new BadRequestException('Not found role');
    }
  }

  async remove(id: number) {
    return await this.roleRepository
      .createQueryBuilder()
      .softDelete()
      .where('id = :id', { id })
      .execute();
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
