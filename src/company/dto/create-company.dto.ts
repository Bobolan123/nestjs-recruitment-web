// create-company.dto.ts
import { IsNotEmpty } from 'class-validator';
import { Express } from 'express';
import { Skill } from 'src/skills/entities/skill.entity';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  company_type: string;

  @IsNotEmpty()
  logo: string;

  skills: Skill[];
}
