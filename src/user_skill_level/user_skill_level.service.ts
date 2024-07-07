import { Injectable } from '@nestjs/common';
import { CreateUserSkillLevelDto } from './dto/create-user_skill.dto';
import { UpdateUserSkillLevelDto } from './dto/update-user_skill.dto';


@Injectable()
export class UserSkillLevelService {
  create(createUserSkillLevelDto: CreateUserSkillLevelDto) {
    return 'This action adds a new UserSkillLevel';
  }

  findAll() {
    return `This action returns all UserSkillLevel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} UserSkillLevel`;
  }

  update(id: number, updateUserSkillLevelDto: UpdateUserSkillLevelDto) {
    return `This action updates a #${id} UserSkillLevel`;
  }

  remove(id: number) {
    return `This action removes a #${id} UserSkillLevel`;
  }
}
