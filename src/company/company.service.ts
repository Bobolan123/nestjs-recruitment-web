import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { IReturn } from 'src/globalType'; //

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = new Company();
    company.name = createCompanyDto.name;
    company.description = createCompanyDto.description;
    company.location = createCompanyDto.location;
    company.logo = createCompanyDto.logo;

    await this.companyRepository.save(company);

    return company;
  }

  async findAll(curPage: number, limit: number = 10, qs) {
    const offset = (curPage - 1) * limit;

    const [result, total] = await this.companyRepository.findAndCount({
      // where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },
      take: limit,
      skip: offset,
    });

    return {
      companies: result,
      totalCompanies: total,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: any): Promise<Company> {
    return this.companyRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.findOne(id);

    company.name = updateCompanyDto.name || company.name;
    company.description = updateCompanyDto.description || company.description;
    company.location = updateCompanyDto.location || company.location;
    company.logo = updateCompanyDto.logo || company.logo;

    await this.companyRepository.save(company);
    return company;
  }

  async remove(id: number) {
    const del = await this.companyRepository.delete(id);
    return del;
  }
}
