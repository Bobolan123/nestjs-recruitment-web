import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from './entities/resume.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

function generateUniqueID(): string {
  return uuidv4(); // Generate a UUID (version 4)
}

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
  ) {}

  async createCV(
    createResumeDto: any,
    cvFile: Express.Multer.File,
  ): Promise<Resume> {
    const resume = new Resume();
    resume.status = createResumeDto.status;
    resume.job = createResumeDto.job;
    resume.user = createResumeDto.user;

    const savedResume = await this.resumeRepository.save(resume);
    return savedResume;
  }

  async findAll(): Promise<Resume[]> {
    const resumes = await this.resumeRepository.find({
      relations: ['user', 'job', 'job.company'],
      order: {
        id: 'ASC',
      },
    });
    return resumes;
  }

  async findOne(id: number): Promise<Resume> {
    const resume = await this.resumeRepository.findOne({
      where: { id },
      relations: ['user', 'job', 'job.company'],
    });
    return resume;
  }

  async update(id: number, updateResumeDto: UpdateResumeDto): Promise<Resume> {
    const existResume = await this.findOne(id);
    if (existResume) {
      existResume.job = updateResumeDto.job;
      existResume.status = updateResumeDto.status;
      await this.resumeRepository.save(existResume);
      return existResume;
    } else {
      throw new BadRequestException('Not found resume');
    }
  }

  async remove(id: number) {
    const resumeToRemove = await this.findOne(id);
    if (!resumeToRemove) {
      throw new BadRequestException('Not found resume');
    }
    await this.resumeRepository.delete(id);
    return {};
  }
}
