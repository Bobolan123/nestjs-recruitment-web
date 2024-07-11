import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUpdattePassword } from './user.controller';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private mailerService: MailerService,
  ) {}

  async hashPassword(password): Promise<string> {
    const saltOrRounds = 8;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async findOneByEmail(email: string) {
    const existUser = await this.userRepository.findOne({
      where: { email },
      relations: { role: true },
    });
    return existUser;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
      relations: { role: true },
    });
    if (!existUser) {
      throw new BadRequestException(`The email ${existUser.email} exists`);
    }
    const user: User = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.password = await this.hashPassword(createUserDto.password);
    user.gender = createUserDto.gender;
    user.role = createUserDto.role;
    user.location = createUserDto.location;
    await this.mailerService.sendMail({
      to: createUserDto.email,
      subject: 'Welcome to my website',
      template: './welcome',
      context: {
        name: createUserDto.name,
      },
    });
    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['resumes', 'role'],
      order: {
        id: 'ASC',
      },
    });
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'resumes', 'resumes.job', 'resumes.job.company'],
    });
    return user;
  }

  async findOneByToken(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    return user;
  }

  async findProfileCv(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['role', 'resumes', 'resumes.job', 'resumes.job.company'],
      });
      if (user) {
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) {
      throw new BadRequestException('Invalid user');
    }
    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.password = await this.hashPassword(updateUserDto.password);
    user.gender = updateUserDto.gender;
    user.role = updateUserDto.role;
    await this.userRepository.save(user);
    return user;
  }

  async updatePassword(
    id: number,
    updateUserDto: IUpdattePassword,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('Invalid user');
    }

    const isCorrectPassword = await bcrypt.compare(
      updateUserDto.password,
      user.password,
    );
    if (isCorrectPassword) {
      user.password = await this.hashPassword(updateUserDto.newPassword);

      await this.userRepository.save(user);
      return user;
    }
  }

  async remove(id: number) {
    const userToRemove = await this.userRepository.findOne({
      where: { id },
    });
    if (!userToRemove) {
      throw new BadRequestException('Invalid user');
    }
    return await this.userRepository.delete(id);
  }

  async getRoleApis(userId: number) {
    try {
        const apis = await this.userRepository
            .createQueryBuilder('user')
            .leftJoin('user.role', 'role')
            .leftJoin('role.apis', 'api')
            .select(['api.method', 'api.endpoint'])
            .where('user.id = :userId', { userId })
            .getRawMany(); // Use getRawMany to fetch raw data for the APIs

        return apis;
    } catch (error) {
        console.log(error);
    }
}


}
