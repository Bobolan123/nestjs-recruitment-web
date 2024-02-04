import { Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from './entities/resume.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume) private readonly resumeRepository: Repository<Resume>,
  ) {}

  create(createResumeDto: CreateResumeDto) {
    const resume = new Resume()
    resume.status = createResumeDto.status
    resume.user = createResumeDto.user
    return this.resumeRepository.save(resume)
  }

  findAll() {
    return this.resumeRepository.find({
      relations: {
        user:true,
        job: true,
      }
    })
  }

  findOne(id: number) {
    return this.resumeRepository.findOne({
      where: {id},
      relations: {
        user:true,
        job: true,
      }
    })  }

  async update(id: number, updateResumeDto: UpdateResumeDto) {
    try {
      const existResume = await this.findOne(id);
      if (existResume) {
        existResume.job = updateResumeDto.job
        await this.resumeRepository.save(existResume);
      }
    } catch (error) {
      console.log(error);
    }
  }

  remove(id: number) {
    return this.resumeRepository.delete(id)
  }
}
