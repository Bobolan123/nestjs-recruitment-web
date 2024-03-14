import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from './entities/resume.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IReturn } from 'src/globalType';
@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume) private readonly resumeRepository: Repository<Resume>,
  ) {}

  async create(createResumeDto: CreateResumeDto): Promise<IReturn<Resume>> {
    try {
      const resume = new Resume();
      resume.status = createResumeDto.status;
      resume.job = createResumeDto.job
      resume.user = createResumeDto.user;
      const savedResume = await this.resumeRepository.save(resume);
      return {
        statusCode: 200,
        message: 'Resume created successfully',
        data: savedResume,
      }; 
    } catch (error) { 
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<IReturn<Resume[]>> {
    try {
      const resumes = await this.resumeRepository.find({
        relations: ['user', 'job','job.company'],
        order: {
          id:"ASC"
      }
      });
      return {
        statusCode: 200,
        message: 'Successfully retrieved all resumes',
        data: resumes,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findOne(id: number): Promise<Resume> {
    try {
      const resume = await this.resumeRepository.findOne({
        where: { id },
        relations: ['user', 'job','job.company'],
      });
      return resume
    } catch (error) {
      console.log(error)
    }
  }

  async update(id: number, updateResumeDto: UpdateResumeDto): Promise<IReturn<Resume>> {
    try {
      const existResume = await this.findOne(id);
      if (existResume) {
        existResume.job = updateResumeDto.job;
        existResume.status = updateResumeDto.status
        await this.resumeRepository.save(existResume);
        return {
          statusCode: 200,
          message: 'Resume updated successfully',
          data: existResume,
        };
      } else {
        return {
          statusCode: 404,
          message: 'Resume not found',
        };
      }
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
      const resumeToRemove = await this.findOne(id);
      if (!resumeToRemove) {
        return {
          statusCode: 404,
          message: `Resume with ID ${id} not found`,
        };
      }
      await this.resumeRepository.delete(id);
      return {
        statusCode: 200,
        message: `Resume with ID ${id} removed successfully`,
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

  async uploadCVFile(id: number, cvFile:Express.Multer.File): Promise<IReturn<Resume>> {
    try {
      const existResume = await this.findOne(id);
      if (existResume) {
        existResume.cvFile = cvFile
        await this.resumeRepository.save(existResume);
        return {
          statusCode: 200,
          message: 'Resume updated successfully',
          data: existResume,
        };
      } else {
        return {
          statusCode: 404,
          message: 'Resume not found',
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }
}
