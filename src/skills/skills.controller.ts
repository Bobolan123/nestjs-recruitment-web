import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Public } from 'src/auth/Public';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post('')
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Public()
  @Get('')
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

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(+id, updateSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(+id);
  }
}
