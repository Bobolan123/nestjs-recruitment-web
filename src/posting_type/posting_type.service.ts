import { Injectable } from '@nestjs/common';
import { CreatePostingTypeDto } from './dto/create-posting_type.dto';
import { UpdatePostingTypeDto } from './dto/update-posting_type.dto';

@Injectable()
export class PostingTypeService {
  create(createPostingTypeDto: CreatePostingTypeDto) {
    return 'This action adds a new postingType';
  }

  findAll() {
    return `This action returns all postingType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postingType`;
  }

  update(id: number, updatePostingTypeDto: UpdatePostingTypeDto) {
    return `This action updates a #${id} postingType`;
  }

  remove(id: number) {
    return `This action removes a #${id} postingType`;
  }
}
