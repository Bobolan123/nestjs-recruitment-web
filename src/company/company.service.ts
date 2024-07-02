import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { IReturn } from 'src/globalType'; //
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

function generateUniqueID(): string {
  return uuidv4(); // Generate a UUID (version 4)
}

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<IReturn<Company>> {
    try {
      const company = new Company();
      company.name = createCompanyDto.name;
      company.description = createCompanyDto.description;
      company.location = createCompanyDto.location;

      if (createCompanyDto.logo) {
        const logoBuffer = Buffer.from(createCompanyDto.logo.buffer);
        // company.logo = logoBuffer;
        const uniqueID = await generateUniqueID();
        const extension = path.extname(createCompanyDto.filename);
        const fileName = `${uniqueID}${extension}`;
        const filePath = path.join(
          __dirname,
          '..',
          '..',
          'public',
          'ava_company',
          fileName,
        );

        // Save file with unique name
        fs.writeFileSync(filePath, logoBuffer);
        company.filename = fileName;

      }
      const savedCompany = await this.companyRepository.save(company);
      return {
        statusCode: 200,
        message: 'Company created successfully',
        data: savedCompany,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<IReturn<Company[]>> {
    try {
      const allCompanies = await this.companyRepository.find();
      if (allCompanies && allCompanies.length > 0) {
        return {
          statusCode: 200,
          message: 'Successfully retrieved all companies',
          data: allCompanies,
        };
      } else {
        return {
          statusCode: 404,
          message: 'No companies found',
          data: null,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findOne(id: any): Promise<Company> {
    return this.companyRepository.findOne({
      where: { id },
    });
  }

  async findTopCompany(): Promise<IReturn<Company[]>> {
    try {
      const allCompanies = await this.companyRepository.find();
      if (allCompanies && allCompanies.length > 3) {
        const topCompanies = allCompanies.slice(0, 4);
        return {
          statusCode: 200,
          message: 'Successfully retrieved top companies',
          data: topCompanies,
        };
      } else if (allCompanies && allCompanies.length < 4) {
        return {
          statusCode: 200,
          message: 'Successfully retrieved top companies',
          data: allCompanies,
        };
      } else {
        return {
          statusCode: 404,
          message: 'No companies found',
          data: null,
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<IReturn<Company>> {
    try {
      const company = await this.findOne(id);
      if (!company) {
        return {
          statusCode: 404,
          message: 'Company not found',
          data: null,
        };
      }
      company.name = updateCompanyDto.name || company.name;
      company.description = updateCompanyDto.description || company.description;
      company.location = updateCompanyDto.location || company.location;
      if (updateCompanyDto.logo) {
        // Convert Express.Multer.File to Buffer
        const logoBuffer = Buffer.from(updateCompanyDto.logo.buffer);
        company.logo = logoBuffer;
        company.filename = updateCompanyDto.filename;
      }
      await this.companyRepository.save(company);
      return {
        statusCode: 200,
        message: 'Company updated successfully',
        data: company,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async remove(id: number): Promise<IReturn<Company>> {
    try {
      const company = await this.findOne(id);
      if (!company) {
        return {
          statusCode: 404,
          message: 'Company not found',
          data: null,
        };
      }
      // company.jobs=[]
      // await this.companyRepository.save(company)
      const del = await this.companyRepository.delete(id);
      return {
        statusCode: 200,
        message: 'Company deleted successfully',
        data: company,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }
}
