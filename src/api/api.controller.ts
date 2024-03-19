import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { GetApiForRole } from './interceptors/getApiForRole';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('create')
  create(@Body() createApiDto: CreateApiDto) {
    return this.apiService.create(createApiDto);
  }

  @Get('read')
  findAll() {
    return this.apiService.findAll();
  }

  @UseInterceptors(GetApiForRole)
  @Get('readForRole')
  readForRole() {
    return this.apiService.readForRole();
  }

  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.apiService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateApiDto: UpdateApiDto) {
    return this.apiService.update(+id, updateApiDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.apiService.remove(+id);
  }
}
