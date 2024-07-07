import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true
    const request = context.switchToHttp().getRequest();

    const user = request.user; // get from JWtAuthguard that is applied global in app module
    const endpoint: string = request.originalUrl;
    if (endpoint.includes('login') || endpoint.includes('read')) {
      return true; 
    } 
    
    const userData = await this.userService.findOneUserWithRoles(user.email);
    const role = userData.role;
    if (role.name === 'admin') {
      return true;
    }
    const apis = role.apis;
    const checkRole = apis.some((api) => endpoint.includes(api.endpoint));
      return checkRole;
  }
}
