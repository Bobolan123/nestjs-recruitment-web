import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkipAuth } from 'src/auth/SkipAuth';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post('create')
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @SkipAuth()
  @Get('read')
  findAll() {
    return this.skillsService.findAll();
  }

  
  @Get('readByIds')
  findByIds(@Body() ids:number[]) {
    return this.skillsService.findByIds(ids);
  }

  @Post('getEmail')
  getEmail(@Body() data:{email:string,ids:number[]}) {
    return this.skillsService.getEmail(data);
  }

  @SkipAuth()
  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(+id);
  }
}
