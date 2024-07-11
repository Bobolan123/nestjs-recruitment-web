// create-company.dto.ts
import { IsNotEmpty } from 'class-validator';
import { Express } from 'express';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  description: string;

  location: string;

  filename: string;
  
  @IsNotEmpty()
  logo: string;
}
