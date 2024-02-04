import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { Resume } from './entities/resume.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Resume])],
  controllers: [ResumeController],
  providers: [ResumeService],
})
export class ResumeModule {}
