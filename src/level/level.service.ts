import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level } from './entities/level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IReturn } from 'src/globalType';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level) private readonly levelRepository: Repository<Level>,
  ) {}

  async create(createLevelDto: CreateLevelDto): Promise<IReturn<Level>> {
    try {
      const level = new Level();
      level.name = createLevelDto.name;
      const savedLevel = await this.levelRepository.save(level);
      return {
        statusCode: 200,
        message: 'Level created successfully',
        data: savedLevel,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<IReturn<Level[]>> {
    try {
      const levels = await this.levelRepository.find();
      return {
        statusCode: 200,
        message: 'Successfully retrieved all levels',
        data: levels,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findOne(id: number): Promise<Level> {
    try {
      return await this.levelRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateLevelDto: UpdateLevelDto): Promise<IReturn<Level>> {
    try {
      const existLevel = await this.findOne(id);
      if (existLevel) {
        existLevel.name = updateLevelDto.name;
        await this.levelRepository.save(existLevel);
        return {
          statusCode: 200,
          message: 'Level updated successfully',
          data: existLevel,
        };
      } else {
        return {
          statusCode: 404,
          message: 'Level not found',
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
      const levelToRemove = await this.findOne(id);
      if (!levelToRemove) {
        return {
          statusCode: 404,
          message: `Level with ID ${id} not found`,
        };
      }
      await this.levelRepository.delete(id);
      return {
        statusCode: 200,
        message: `Level with ID ${id} removed successfully`,
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
