import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const isValidPassword = await bcrypt.compare(pass, user.password);
    if (user && isValidPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}