import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}

  create(createJobDto: CreateJobDto) {
    const job = new Job();
    job.name = createJobDto.name;
    job.description = createJobDto.description;
    job.skills = createJobDto.skills;
    job.count = 0;
    job.status = createJobDto.status;
    job.salary = createJobDto.salary;
    job.company = createJobDto.company;
    return this.jobRepository.save(job);
  }

  async findAll() {
    return await this.jobRepository.find({
      relations: {
        company: true,
        level: true,
        resumes: true,
      },
    }); 
  }

  findOne(id: number) {
    return this.jobRepository.findOne({
      where:{id},
      relations: {
        company: true,
        level: true,
        resumes: true,
      },
    });
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    try {
      const existJob = await this.findOne(id);

      if (existJob) {
        // const resumes = existJob.resumes.map(id => ({...existJob.resumes, updateJobDto.job}))
      }
    } catch (error) {
      
    }
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
