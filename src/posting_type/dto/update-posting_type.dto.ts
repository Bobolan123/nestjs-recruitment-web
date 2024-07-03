import { PartialType } from '@nestjs/swagger';
import { CreatePostingTypeDto } from './create-posting_type.dto';

export class UpdatePostingTypeDto extends PartialType(CreatePostingTypeDto) {}
