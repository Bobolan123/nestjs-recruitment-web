import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { DifferencesDateInterceptor } from 'src/company/interceptors/differencesDate.interceptor';
import { Public } from 'src/auth/Public';
import { ResponseMessage } from 'src/decorator/responseMessage.decorator';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @ResponseMessage('Create a job')
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Public()
  @ResponseMessage('Fetch jobs')
  // @UseInterceptors(DifferencesDateInterceptor)
  @Get()
  findAll(
    @Query('page') curPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.jobService.findAll(+curPage, +limit, qs);
  }

  @Public() 
  @ResponseMessage('Fetch a job')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Update a job')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete  a job')
  remove(@Param('id') id: string) {
    return this.jobService.remove(+id);
  }
}
