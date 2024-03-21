import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm'; // Import In operator
import { IReturn } from 'src/globalType';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    private mailerService: MailerService,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<IReturn<Skill>> {
    try {
      const { name } = createSkillDto; // Extract the name from the DTO
      const skill = new Skill();
      skill.name = name; // Assign the name to the skill
      // You can assign other properties as needed
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
      const skills = await this.skillRepository.find({
        relations: {
          jobs: true,
        },
      });
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

  async findByIds(ids: number[]): Promise<Skill[]> {
    try {
      const jobs = await this.skillRepository.find({
        where: {
          id: In(ids),
        },
        relations: ['jobs'],
      });
      return jobs;
    } catch (error) {
      console.log(error);
    }
  }

  async getEmail(data: { email: string; ids: number[] }): Promise<any> {
    try {
      const skills = await this.findByIds(data.ids);
      const getEmail = await this.mailerService.sendMail({
        to: data.email,
        subject: 'Jobs related to your skills',
        template: './jobs',
        context: {
          skills: skills,
        },
      });
      if (getEmail) {
        return{
          message:'Sent Email successfully',
          statusCode: 200
        }
      }
    } catch (error) {
      console.log(error);
      return {
        message:'Sent Email failed',
        statusCode: 401
      }
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
