import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm'; // Import In operator
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    private mailerService: MailerService,
  ) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    const { name } = createSkillDto; // Extract the name from the DTO
    const skill = new Skill();
    skill.name = name; // Assign the name to the skill
    // You can assign other properties as needed
    const savedSkill = await this.skillRepository.save(skill);
    return savedSkill;
  }

  async findAll(): Promise<Skill[]> {
    const skills = await this.skillRepository.find({
      relations: {
        jobs: true,
      },
    });
    return skills;
  }

  async findByIds(ids: number[]): Promise<Skill[]> {
    const jobs = await this.skillRepository.find({
      where: {
        id: In(ids),
      },
      relations: ['jobs'],
    });
    return jobs;
  }

  async getEmail(data: { email: string; ids: number[] }): Promise<any> {
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
      return 'Sent Email successfully';
    }
  }

  findOne(id: number): Promise<Skill> {
    return this.skillRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    const existingSkill = await this.findOne(id);
    if (!existingSkill) {
      throw new BadRequestException('Skill not found');
    }
    const updatedSkill = Object.assign(existingSkill, updateSkillDto);
    await this.skillRepository.save(updatedSkill);
    return updatedSkill;
  }

  async remove(id: number) {
    const skillToRemove = await this.findOne(id);
    if (!skillToRemove) {
      throw new BadRequestException('Skill not found');
    }
    await this.skillRepository.delete(id);
    return {};
  }
}
