import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IReturn } from 'src/globalType';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<IReturn<Job>> {
    try {
      const job = new Job();
      job.name = createJobDto.name;
      job.description = createJobDto.description;
      job.skills = createJobDto.skills;
      job.count = 0;
      job.status = createJobDto.status;
      job.salary = createJobDto.salary;
      job.company = createJobDto.company;
      const savedJob = await this.jobRepository.save(job);
      return {
        statusCode: 200,
        message: 'Job created successfully',
        data: savedJob,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<IReturn<Job[]>> {
    try {
      const jobs = await this.jobRepository.find({
        relations: ['company', 'level', 'resumes'],
      });
      return {
        statusCode: 200,
        message: 'Successfully retrieved all jobs',
        data: jobs,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  findOne(id: number): Promise<Job> {
    return this.jobRepository.findOne({
      where: { id },
      relations: {
        company: true,
        skills: true,
        resumes: true,
      },
    });
  }

  async update(id: number, updateJobDto: UpdateJobDto): Promise<IReturn<Job>> {
    try {
      const existingJob = await this.findOne(id);
      if (!existingJob) {
        return {
          statusCode: 404,
          message: 'Job not found',
        };
      }
      const updatedJob = Object.assign(existingJob, updateJobDto);
      await this.jobRepository.save(updatedJob);
      return {
        statusCode: 200,
        message: 'Job updated successfully',
        data: updatedJob,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async remove(id: number): Promise<IReturn<null>> {
    try {
      const jobToRemove = await this.findOne(id);
      if (!jobToRemove) {
        return {
          statusCode: 404,
          message: `Job with ID ${id} not found`,
          data: null,
        };
      }
      await this.jobRepository.delete(id);
      return {
        statusCode: 200,
        message: `Job with ID ${id} removed successfully`,
        data: null,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }
}
