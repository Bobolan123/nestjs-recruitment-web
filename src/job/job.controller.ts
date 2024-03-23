import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { DifferencesDateInterceptor } from 'src/company/interceptors/differencesDate.interceptor';
import { SkipAuth } from 'src/auth/SkipAuth';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post('create')
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @SkipAuth()
  @UseInterceptors(DifferencesDateInterceptor)
  @Get('readAllJob')
  findAll() {
    return this.jobService.findAll();
  }

  @SkipAuth() 
  @Get('readJob/:id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
