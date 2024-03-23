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
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import * as mimeTypes from 'mime-types'; // Import the 'mime-types' library
import { SkipAuth } from 'src/auth/SkipAuth';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('logo')) // 'logo' should match the property name in CreateCompanyDto
  async create(
    @UploadedFile() logo: Express.Multer.File,
    @Body('description') description: string,
    @Body('name') name: string,
    @Body('location') location: string,
  ) {
    const createCompanyDto: CreateCompanyDto = {
      description,
      name,
      location,
      logo: logo, // Assign the logo file object
      filename: logo.originalname, // Assign the filename
    };

    const allowedImageTypes = ['png', 'jpg'];
    if (
      logo &&
      allowedImageTypes.some((type) => logo.originalname.includes(type))
    ) {
      createCompanyDto.logo = logo; // Attach the logo file to the DTO
      createCompanyDto.filename = logo.originalname;
      return await this.companyService.create(createCompanyDto);
    } else {
      return {}; // Handle invalid file type or no file uploaded
    }
  }

  @SkipAuth()
  @Get('readCompanies')
  findAll() {
    return this.companyService.findAll();
  }

  @SkipAuth()
  @Get('read/:id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Get('readTopCompany')
  findTopCompany() {
    return this.companyService.findTopCompany();
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('logo')) // 'logo' should match the property name in CreateCompanyDto
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    const allowedImageTypes = ['png', 'jpg'];
    if (allowedImageTypes.some((type) => logo.originalname.includes(type))) {
      updateCompanyDto.logo = logo; // Attach the logo file to the DTO
      updateCompanyDto.filename = logo.originalname;
      return this.companyService.update(+id, updateCompanyDto);
    } else {
      return {};
    }
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
    const allowedImageTypes = ['png', 'jpg', 'jpeg'];

    if (allowedImageTypes.some((type) => contentType.includes(type))) {
      // Set appropriate headers for image response
      res.setHeader('Content-Type', contentType);

      // Send the image binary data to the client
      return res.send(company.logo);
    } else {
      res.send('image type is not allowed');
    }
  }
}
