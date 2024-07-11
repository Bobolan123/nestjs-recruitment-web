import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; 
import { IUser } from 'src/user/user.interface';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private roleService: RoleService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string | number>('JWT_ACCESS_TOKEN'),
    });
  }

  async validate(payload: IUser) {
    const { id, email, name, role } = payload;
    const roleByUserId = await this.roleService.findOne(id);
    const permissions = roleByUserId?.apis

    return {
      id: id,
      email: email,
      name: name,
      role: role,
      permissions
    };
  }
}
