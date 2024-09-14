import { IsNotEmpty } from 'class-validator';
import { Company } from 'src/company/entities/company.entity';

export class CreateLocationDto {
  address: string;

  city: string;

  address1: string;

  address_city1: string;

  address2: string;

  address_city2: string;

  address3: string;

  address_city3: string;

  @IsNotEmpty()
  company: Company;
}
