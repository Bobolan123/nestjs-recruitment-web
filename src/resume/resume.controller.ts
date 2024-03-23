import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkipAuth } from 'src/auth/SkipAuth';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('create')
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumeService.create(createResumeDto);
  }

  @Patch('uploadCVFile/:id')
  @UseInterceptors(FileInterceptor('cvFile'))
  uploadCVFile( 
    @Param('id') id: string,
    @UploadedFile() cvFile: Express.Multer.File,
  ) {
    return this.resumeService.uploadCVFile(+id, cvFile);
  }

  @SkipAuth()
  @Get('read')
  findAll() {
    return this.resumeService.findAll();
  }

  @SkipAuth()
  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.resumeService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumeService.update(+id, updateResumeDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.resumeService.remove(+id);
  }
}
