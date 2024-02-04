import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post('create')
  create(@Body() createLevelDto: CreateLevelDto) {
    return this.levelService.create(createLevelDto);
  }

  @Get('read')
  findAll() {
    return this.levelService.findAll();
  }

  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.levelService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    return this.levelService.update(+id, updateLevelDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.levelService.remove(+id);
  }
}
