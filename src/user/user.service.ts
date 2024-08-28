import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUpdattePassword } from './user.controller';
import { MailerService } from '@nest-modules/mailer';
import * as dayjs from 'dayjs';
import { AuthVerifiedOtp } from 'src/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private mailerService: MailerService,
  ) {}

  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }
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

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
      relations: { role: true },
    });

    if (existUser) {
      throw new BadRequestException(`The email ${existUser.email} exists`);
    }
    const user: User = new User();

    user.name = createUserDto?.name;
    user.age = createUserDto?.age;
    user.email = createUserDto?.email;
    user.password = await this.hashPassword(createUserDto?.password);
    user.gender = createUserDto?.gender;
    user.role = createUserDto?.role;
    user.location = createUserDto?.location;
    user.otp = this.generateOTP();
    user.isActive = false;
    // Set otpExpired to 2 minutes from now
    user.otpExpired = dayjs().add(10, 'minutes').toDate();

    const savedUser = await this.userRepository.save(user);
    await this.mailerService.sendMail({
      to: createUserDto.email,
      subject: 'Welcome to my website',
      template: './otpVerified',
      context: {
        name: createUserDto.name,
        otp: user?.otp,
      },
    });

    return {
      id: user.id,
      email: user.email,
    };
  }

  async verifyOtp(authVerifiedOtp: AuthVerifiedOtp) {
    const user = await this.userRepository.findOne({
      where: {
        id: authVerifiedOtp.id,
        otp: authVerifiedOtp.otp,
      },
    });

    if (!user) {
      throw new BadRequestException('The OTP is not valid or expired');
    }

    const isExpired = dayjs().isBefore(user.otpExpired);
    if (!isExpired) {
      await await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ isActive: true })
        .where('id = :id', { id: authVerifiedOtp.id })
        .execute();
      return { isExpired };
    } else {
      throw new BadRequestException('The OTP is not valid or expired');
    }
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
        .select([
          'api.method AS method',
          'api.endpoint  AS endpoint',
          'api.module  AS module',
        ])
        .where('user.id = :userId', { userId })
        .getRawMany(); // Use getRawMany to fetch raw data for the APIs
      return apis;
    } catch (error) {
      console.log(error);
    }
  }
}
