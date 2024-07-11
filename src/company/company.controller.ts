// company.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public } from 'src/auth/Public';
import { ResponseMessage } from 'src/decorator/responseMessage.decorator';
import { IUser } from 'src/user/user.interface';
import { UserDecorator } from 'src/decorator/user.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Public()
  @ResponseMessage('Fetch companies')
  @Get()
  findAll(
    @Query('page') curPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
    @UserDecorator() user:IUser
  ) {
    return this.companyService.findAll(+curPage, +limit, qs);
  }

  @Public()
  @ResponseMessage('Fetch a company')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Update a company')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ResponseMessage('Delete a company')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
