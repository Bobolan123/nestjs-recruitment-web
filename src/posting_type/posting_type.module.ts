import { Module } from '@nestjs/common';
import { PostingTypeService } from './posting_type.service';
import { PostingTypeController } from './posting_type.controller';

@Module({
  controllers: [PostingTypeController],
  providers: [PostingTypeService],
})
export class PostingTypeModule {}
