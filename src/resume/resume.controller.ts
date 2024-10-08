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
  Query,
} from '@nestjs/common';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/Public';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  @Post('createCV')
  @UseInterceptors(FileInterceptor('cvFile'))
  createCV(
    @UploadedFile() cvFile: Express.Multer.File,
    @Body()
    dataInput: {
      status: string;
      user: string;
      job: string;
    },
  ) {
    // Convert user and job to numbers
    const data = {
      status: dataInput.status,
      user: { id: +dataInput.user },
      job: { id: +dataInput.job },
    };

    return this.resumeService.createCV(data, cvFile);
  }

  @Public()
  @Get('read')
  findAll(
    @Query('page') curPage: string,
    @Query('limit') limit: string,
    @Query() qs: any,
  ) {
    return this.resumeService.findAll(+curPage, +limit, qs);
  }

  @Public()
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
