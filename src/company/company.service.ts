import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    const company = new Company()
    company.name = createCompanyDto.name
    company.description = createCompanyDto.description
    company.logo = createCompanyDto.logo
    company.location = createCompanyDto.location
    return this.companyRepository.save(company)
  }

  findAll() {
    return this.companyRepository.find()
  }

  findOne(id: number) {
    return this.companyRepository.findOne({
      where:{id}
    })
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return this.companyRepository.delete(id)
  }
}
