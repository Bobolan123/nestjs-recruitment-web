import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostingTypeService } from './posting_type.service';
import { CreatePostingTypeDto } from './dto/create-posting_type.dto';
import { UpdatePostingTypeDto } from './dto/update-posting_type.dto';

@Controller('posting-type')
export class PostingTypeController {
  constructor(private readonly postingTypeService: PostingTypeService) {}

  @Post()
  create(@Body() createPostingTypeDto: CreatePostingTypeDto) {
    return this.postingTypeService.create(createPostingTypeDto);
  }

  @Get()
  findAll() {
    return this.postingTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postingTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostingTypeDto: UpdatePostingTypeDto) {
    return this.postingTypeService.update(+id, updatePostingTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postingTypeService.remove(+id);
  }
}
