import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level } from './entities/level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level) private readonly levelRepository: Repository<Level>,
  ) {}

  create(createLevelDto: CreateLevelDto) {
    const level = new Level()
    level.name = createLevelDto.name
    return this.levelRepository.save(level)
  }

  findAll() {
    return this.levelRepository.find()
  }

  findOne(id: number) {
    return this.levelRepository.findOne({
      where:{id}
    })
  }

  async update(id: number, updateLevelDto: UpdateLevelDto) {
    try {
      const existLevel = await this.findOne(id)
      
    } catch (error) {
      console.log(error)
    }
  }

  remove(id: number) {
    return this.levelRepository.delete(id)
  }
}
