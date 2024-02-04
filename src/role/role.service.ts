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

  create(createRoleDto: CreateRoleDto) {
    const role: Role = new Role();
    role.description = createRoleDto.description;
    role.name = createRoleDto.name;
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find({
      relations: {
        apis: true,
        users: true,
      },
    });
  }

  findOne(id: number) {
    return this.roleRepository.findOne({
      where: { id },
      relations: {
        apis: true,
        users: true,
      },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      const existRole = await this.findOne(id);

      if (existRole) {
        const apis = updateRoleDto.apiIds.map((id) => ({ ...new Api(), id }));
        existRole.apis= apis
      }      
      return this.roleRepository.save(existRole)
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return this.roleRepository.delete(id)
  }
}
