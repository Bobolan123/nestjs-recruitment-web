import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IReturn } from 'src/globalType';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async hashPassword(password): Promise<string> {
    const saltOrRounds = 8;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async create(createUserDto: CreateUserDto): Promise<IReturn<User>> {
    try {
      const existUser = await this.findOneByEmail(createUserDto.email);
      if (existUser.data && existUser.statusCode === 201) {
        const user: User = new User();
        user.name = createUserDto.name;
        user.age = createUserDto.age;
        user.email = createUserDto.email;
        user.password = await this.hashPassword(createUserDto.password);
        user.gender = createUserDto.gender;
        user.role = createUserDto.role;
        user.location = createUserDto.location;
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
        relations: ['role'],
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

  async findOneByEmail(email: string): Promise<IReturn<User | undefined>> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
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
      user.password = updateUserDto.password;
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
        relations: ['role'],
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
