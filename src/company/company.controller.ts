// company.controller.ts
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
  Res,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as mimeTypes from 'mime-types'; // Import the 'mime-types' library

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('logo')) // 'logo' should match the property name in CreateCompanyDto
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    const allowedImageTypes = ['png', 'jpg'];
    if (allowedImageTypes.some(type => logo.originalname.includes(type))) {
      createCompanyDto.logo = logo; // Attach the logo file to the DTO
      createCompanyDto.filename = logo.originalname
      return this.companyService.create(createCompanyDto);
    } else{
      return {}
    }
  }

  @Get('readAllCompany')
  findAll() {
    return this.companyService.findAll();
  }

  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Get('readTopCompany')
  findTopCompany() {
    return this.companyService.findTopCompany();
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }

  @Get('logo/:id')
  async getLogo(@Param('id') id: string, @Res() res: any) {
    const company = await this.companyService.findOne(+id);

    if (!company || !company.logo) {
      return res.status(404).send('Company or logo not found');
    }

    // Determine content type based on file extension
    const contentType = mimeTypes.lookup(company.filename); // Replace 'image.png' with the actual file name
    if (!contentType) {
      return res.status(500).send('Internal Server Error');
    }
    const allowedImageTypes = ['png', 'jpg','jpeg'];

    if (allowedImageTypes.some(type => contentType.includes(type))) {
      // Set appropriate headers for image response
      res.setHeader('Content-Type', contentType);

      // Send the image binary data to the client
      return res.send(company.logo);
    } else {
      res.send('image type is not allowed');
    }
  }
}
