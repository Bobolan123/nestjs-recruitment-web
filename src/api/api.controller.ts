import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { GetApiForRole } from './interceptors/getApiForRole';
import { ResponseMessage } from 'src/decorator/responseMessage.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post()
  create(@Body() createApiDto: CreateApiDto) {
    return this.apiService.create(createApiDto);
  }

  @Get()
  @ResponseMessage('Fetch all apis')
  findAll() {
    return this.apiService.findAll();
  }

  @UseInterceptors(GetApiForRole)
  @Get('readForRole')
  readForRole() {
    return this.apiService.readForRole();
  }

  @Get(':id')
  @ResponseMessage('Fetch one api')
  findOne(@Param('id') id: string) {
    return this.apiService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Update an api by id')
  update(@Param('id') id: string, @Body() updateApiDto: UpdateApiDto) {
    return this.apiService.update(+id, updateApiDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete an api by id')
  remove(@Param('id') id: string) {
    return this.apiService.remove(+id);
  }
}
