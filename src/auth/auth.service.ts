import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const isValidPassword = await bcrypt.compare(pass, user.data.password);
    if (user && isValidPassword) {
      const { password, age, location, ...result } = user.data;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };
    return {
      email:user.email,
      name:user.name,
      id:user.id,
      access_token: this.jwtService.sign(payload, {
        privateKey: `${process.env.JWT_KEY}`,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: `7d`,
        privateKey: `${process.env.JWT_KEY}`,
      }),
    };
  }

  async refreshToken(user: User) {
    const payload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        privateKey: process.env.JWT_KEY,
      }),
    };
  }
}
