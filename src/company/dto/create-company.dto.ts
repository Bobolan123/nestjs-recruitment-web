// create-company.dto.ts
import { IsNotEmpty } from 'class-validator';
import { Express } from 'express';
import { Location } from 'src/location/entities/location.entity';
import { Skill } from 'src/skills/entities/skill.entity';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  briefInformation: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  industry: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  filename: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  logo: string;

  skills: Skill[];

  locations: Location[];

}
