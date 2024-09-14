import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = new Job();
    job.name = createJobDto.name;
    job.description = createJobDto.description;
    job.skills = createJobDto.skills;
    job.count = createJobDto.count;
    job.location = createJobDto.location;
    job.status = createJobDto.status;
    job.salary = createJobDto.salary;
    job.company = createJobDto.company;
    job.level = createJobDto.level;
    job.startDate = createJobDto.startDate;
    job.endDate = createJobDto.endDate;
    const savedJob = await this.jobRepository.save(job);
    return savedJob;
  }

  async findAll(curPage: number, limit: number = 10, qs?: any) {
    const offset = (curPage - 1) * limit;

    const [result, total] = await this.jobRepository.findAndCount({
      // where: { name: Like('%' + keyword + '%') }, order: { name: "DESC" },
      order: { created_at: qs?.sort },
      take: limit,
      skip: offset,
      relations: ['company', 'skills', 'resumes'],
      select: {
        company: {
          logo: true,
          name: true,
        },
        skills: {
          name: true,
        },
        resumes: {
          status: true,
          cvFile: true,
        },
      },
    });

    return {
      jobs: result,
      totalJobs: total,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: number): Promise<Job> {
    return this.jobRepository.findOne({
      where: { id },
      relations: {
        company: true,
        skills: true,
      },
      select: {
        company: {
          logo: true,
          name: true,
        },
        skills: {
          name: true,
        },
      },
    });
  }

  

  async update(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
    const existingJob = await this.findOne(id);
    if (!existingJob) {
      throw new BadRequestException('Job not found');
    }
    const updatedJob = Object.assign(existingJob, updateJobDto);
    await this.jobRepository.save(updatedJob);

    return updatedJob;
  }

  async remove(id: number) {
    const jobToRemove = await this.findOne(id);
    if (!jobToRemove) {
      throw new BadRequestException('Job not found');
    }
    await this.jobRepository.delete(id);
    return 'OK';
  }
}
