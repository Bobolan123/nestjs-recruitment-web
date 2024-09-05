import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipeBuilder,
  UseInterceptors,
  HttpStatus,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/Public';
import { ResponseMessage } from 'src/decorator/responseMessage.decorator';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @ResponseMessage('Upload image')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(png|jpeg|jpg|pdf)',
        })
        .addMaxSizeValidator({
          maxSize: 2 * 1024 * 1024, //2mb,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return file.filename;
  }


  @Get()
  getFile(@Res() res: Response) {
    console.log(join(process.cwd(), 'package.json'))
    const file = createReadStream(join(process.cwd(), 'package.json'));
    console.log(file)
    return new StreamableFile(file);
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
