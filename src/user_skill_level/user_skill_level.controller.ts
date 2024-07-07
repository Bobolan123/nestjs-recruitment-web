import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSkillLevelService } from './user_skill_level.service';
import { CreateUserSkillLevelDto } from './dto/create-user_skill.dto';
import { UpdateUserSkillLevelDto } from './dto/update-user_skill.dto';

@Controller('user-skill')
export class UserSkillLevelController {
  constructor(private readonly UserSkillLevelService: UserSkillLevelService) {}

  @Post()
  create(@Body() createUserSkillLevelDto: CreateUserSkillLevelDto) {
    return this.UserSkillLevelService.create(createUserSkillLevelDto);
  }

  @Get()
  findAll() {
    return this.UserSkillLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserSkillLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSkillLevelDto: UpdateUserSkillLevelDto) {
    return this.UserSkillLevelService.update(+id, updateUserSkillLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.UserSkillLevelService.remove(+id);
  }
}
