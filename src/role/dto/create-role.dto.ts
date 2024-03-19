import { IsEnum, IsNotEmpty } from 'class-validator';
import { Api } from 'src/api/entities/api.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEnum(['hr', 'user', 'admin'])
  name: 'hr' | 'user' | 'admin';

  description: string;

  apis: Api[];
}
