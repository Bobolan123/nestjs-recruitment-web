import { PartialType } from '@nestjs/swagger';
import { CreateUserSkillLevelDto } from './create-user_skill.dto';

export class UpdateUserSkillLevelDto extends PartialType(CreateUserSkillLevelDto) {}
