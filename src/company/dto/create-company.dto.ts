// create-company.dto.ts
import { IsNotEmpty } from 'class-validator';
import { Express } from 'express';

export class CreateCompanyDto {
  name: string;

  description: string;

  location: string;

  filename: string;
  
  logo: Express.Multer.File;
}
