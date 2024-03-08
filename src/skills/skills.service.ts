import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IReturn } from 'src/globalType';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<IReturn<Skill>> {
    try {
      const skill = new Skill();
      skill.name = createSkillDto.name;
      // Set other properties as needed from createSkillDto
      const savedSkill = await this.skillRepository.save(skill);
      return {
        statusCode: 200,
        message: 'Skill created successfully',
        data: savedSkill,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<IReturn<Skill[]>> {
    try {
      const skills = await this.skillRepository.find();
      return {
        statusCode: 200,
        message: 'Successfully retrieved all skills',
        data: skills,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  findOne(id: number): Promise<Skill> {
    return this.skillRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateSkillDto: UpdateSkillDto,
  ): Promise<IReturn<Skill>> {
    try {
      const existingSkill = await this.findOne(id);
      if (!existingSkill) {
        return {
          statusCode: 404,
          message: 'Skill not found',
        };
      }
      const updatedSkill = Object.assign(existingSkill, updateSkillDto);
      await this.skillRepository.save(updatedSkill);
      return {
        statusCode: 200,
        message: 'Skill updated successfully',
        data: updatedSkill,
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
      const skillToRemove = await this.findOne(id);
      if (!skillToRemove) {
        return {
          statusCode: 404,
          message: `Skill with ID ${id} not found`,
          data: null,
        };
      }
      await this.skillRepository.delete(id);
      return {
        statusCode: 200,
        message: `Skill with ID ${id} removed successfully`,
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
