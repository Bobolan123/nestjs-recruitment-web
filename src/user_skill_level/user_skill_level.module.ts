import { Module } from '@nestjs/common';
import { UserSkillLevelService } from './user_skill_level.service';
import { UserSkillLevelController } from './user_skill_level.controller';


@Module({
  controllers: [UserSkillLevelController],
  providers: [UserSkillLevelService],
})
export class UserSkillLevelModule {}
