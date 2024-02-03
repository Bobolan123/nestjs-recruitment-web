import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  
  async hashPassword(password):Promise<string> {
    const saltOrRounds = 8;
    const hash = await bcrypt.hash(password, saltOrRounds); 
    return hash
  }
  async create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.password = await this.hashPassword(createUserDto.password);
    user.gender = createUserDto.gender;
    user.role = createUserDto.role
    user.location = createUserDto.location
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.gender = updateUserDto.gender;
    user.role = updateUserDto.role
    user.id = id;
    return this.userRepository.save(user);  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
