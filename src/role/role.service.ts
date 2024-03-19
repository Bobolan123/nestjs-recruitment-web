import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Api } from 'src/api/entities/api.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role: Role = new Role();
      role.description = createRoleDto.description;
      role.name = createRoleDto.name;
      role.apis = createRoleDto.apis;
      const savedRole = await this.roleRepository.save(role);
      return {
        statusCode: 201,
        message: 'Role created successfully',
        data: savedRole,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findAll() {
    try {
      const roles = await this.roleRepository.find({
        relations: {
          apis: true,
          users: true,
        },
        order: {
          id: 'ASC',
        },
      });
      return {
        statusCode: 200,
        message: 'Roles retrieved successfully',
        data: roles,
      };
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findOne(id: number) {
    try {
      const role = await this.roleRepository.findOne({
        where: { id },
        relations: {
          apis: true,
          users: true,
        },
      });
      if (role) {
        return {
          statusCode: 200,
          message: 'Role found',
          data: role,
        };
      } else {
        return {
          statusCode: 404,
          message: 'Role not found',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const existRole = await this.findOne(id);

      if (existRole.statusCode === 200) {
        const apis = updateRoleDto.apis;
        existRole.data.apis = apis;
        const updatedRole = await this.roleRepository.save(existRole.data);
        return {
          statusCode: 200,
          message: 'Role updated successfully',
          data: updatedRole,
        };
      } else {
        return existRole; // Return the existing response structure
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const deleteResult = await this.roleRepository.delete(id);
      if (deleteResult.affected === 1) {
        return {
          statusCode: 200,
          message: `Role with ID ${id} removed successfully`,
        };
      } else {
        return {
          statusCode: 404,
          message: `Role with ID ${id} not found`,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }
}
