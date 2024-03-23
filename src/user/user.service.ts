import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IReturn } from 'src/globalType';
import { IUpdattePassword } from './user.controller';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private mailerService: MailerService,
  ) {}

  async hashPassword(password): Promise<string> {
    const saltOrRounds = 8;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async create(createUserDto: CreateUserDto): Promise<IReturn<User>> {
    try {
      const existUser = await this.findOneByEmail(createUserDto.email);
      console.log(existUser);
      if (existUser?.statusCode === 404) {
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

        
        return {
          statusCode: 201,
          message: 'User created successfully',
          data: savedUser,
        };
      } else {
        return {
          statusCode: 409,
          message: 'Email already exists',
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

  async findAll(): Promise<IReturn<User[]>> {
    try {
      const users = await this.userRepository.find({
        relations: ['resumes', 'role'],
      });
      return {
        statusCode: 200,
        message: 'Successfully retrieved all users',
        data: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async findOne(id: number): Promise<IReturn<User>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['role', 'resumes', 'resumes.job', 'resumes.job.company'],
      });
      if (user) {
        return {
          statusCode: 200,
          message: 'User found',
          data: user,
        };
      } else {
        return {
          statusCode: 404,
          message: 'User not found',
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
  
  async findOneByEmail(email: string): Promise<IReturn<User | undefined>> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: { role: true },
      });
      if (user) {
        return {
          statusCode: 200,
          message: 'User found',
          data: user,
        };
      } else {
        return {
          statusCode: 404,
          message: 'User not found',
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

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<IReturn<User>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['role'],
      });
      if (!user) {
        return {
          statusCode: 404,
          message: 'User not found',
        };
      }
      user.name = updateUserDto.name;
      user.age = updateUserDto.age;
      user.email = updateUserDto.email;
      user.password = await this.hashPassword(updateUserDto.password);
      user.gender = updateUserDto.gender;
      user.role = updateUserDto.role;
      await this.userRepository.save(user);
      return {
        statusCode: 200,
        message: 'User updated successfully',
        data: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
        error: error.message,
      };
    }
  }

  async updatePassword(
    id: number,
    updateUserDto: IUpdattePassword,
  ): Promise<IReturn<User | {}>> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      if (!user) {
        return {
          statusCode: 404,
          message: 'User not found',
        };
      }

      const isCorrectPassword = await bcrypt.compare(
        updateUserDto.password,
        user.password,
      );
      if (isCorrectPassword) {
        user.password = await this.hashPassword(updateUserDto.newPassword);

        await this.userRepository.save(user);
        return {
          statusCode: 200,
          message: 'Update password successfully',
          data: user,
        };
      } else {
        return {
          statusCode: 401,
          message: 'Password not correct',
          data: {},
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
      const userToRemove = await this.userRepository.findOne({
        where: { id },
      });
      if (!userToRemove) {
        return {
          statusCode: 404,
          message: `User with ID ${id} not found`,
        };
      }
      await this.userRepository.delete(id);
      return {
        statusCode: 200,
        message: `User with ID ${id} removed successfully`,
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

  async findOneUserWithRoles(email: string): Promise<IReturn<User>> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        relations: ['role', 'role.apis'],
      });
      if (user) {
        return {
          statusCode: 200,
          message: 'User found',
          data: user,
        };
      } else {
        return {
          statusCode: 404,
          message: 'User not found',
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
