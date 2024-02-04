import { PartialType } from '@nestjs/mapped-types';
import { CreateResumeDto } from './create-resume.dto';
import { Job } from 'src/job/entities/job.entity';

export class UpdateResumeDto extends PartialType(CreateResumeDto) {
    job:Job
}
