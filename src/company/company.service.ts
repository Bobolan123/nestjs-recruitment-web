import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = new Company();
    company.name = createCompanyDto.name;
    company.briefInformation = createCompanyDto.briefInformation;
    company.type = createCompanyDto.type;
    company.industry = createCompanyDto.industry;
    company.size = createCompanyDto.size;    
    company.description = createCompanyDto.description;
    company.logo = createCompanyDto.logo;
    company.skills = createCompanyDto.skills;
    company.locations = createCompanyDto.locations

    await this.companyRepository.save(company);

    return company;
  }

  async findAll(curPage: number, limit: number = 10, qs?) {
    const offset = (curPage - 1) * limit;

    const [result, total] = await this.companyRepository.findAndCount({
      where: {
        locations: {
          city: qs.city,
        },
      },
      take: limit,
      skip: offset,
      relations: ['skills', 'jobs', 'locations'],
      order: {
        created_at: qs.sort,
      },
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
      relations: {
        skills: true,
        // jobs: true,
        // locations: true,
      },
      select: {
        created_at: false,
        description: false,
        // skills: {
        //   name: true,
        // },
      },
    });
  }

  async findCompanySpotlight(): Promise<Company> {
    const query = await this.companyRepository
      .createQueryBuilder('company')
      // .leftJoinAndSelect('company.skills', 'skills')
      .leftJoinAndSelect('company.jobs', 'jobs')
      .leftJoinAndSelect('company.locations', 'locations')
      .select()
      .orderBy('RANDOM()')
      .getOne();

    return query;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.findOne(id);

    company.name = updateCompanyDto.name || company.name;
    company.description = updateCompanyDto.description || company.description;
    company.logo = updateCompanyDto.logo || company.logo;
    company.skills = updateCompanyDto.skills;

    await this.companyRepository.save(company);
    return company;
  }

  async remove(id: number) {
    const del = await this.companyRepository.delete(id);
    return del;
  }
}
