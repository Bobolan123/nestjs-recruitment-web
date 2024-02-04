import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user; // get from JWtAuthguard that is applied global in app module
    const endpoint: string = request.originalUrl;

    if (endpoint.includes('login')) {
      return true
    }

//     const userData = await this.userService.findOneUserWithRoles(user.email)
//     const roles = userData.role;

//     if (userData.group.name === 'admin') {
//       return true
//     }

//     const checkRole = roles.some((role) => endpoint.includes(role.url));
//     return checkRole;
  }
}
