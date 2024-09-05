import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../Public';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // You can throw an exception based on either "info" or "err" arguments
    const request: Request = context.switchToHttp().getRequest();
    if (err || !user) {
      throw err || new UnauthorizedException('Unauthozied');
    }
    const targetMethod = request.method;
    const targetEnpoint = request.route?.path;
    const permissions = user.apis; //{method:string, endpoint: string} get from jwt strategy

    const isExist = permissions.find(
      (permission) =>
        permission.method === targetMethod.toLowerCase() &&
        permission.endpoint === targetEnpoint,
    );
    
    return user;
    if (!isExist) {
      throw new ForbiddenException(
        `You aren't allowed to access this endpoint`,
      );
    }
    return user;
  }
}
