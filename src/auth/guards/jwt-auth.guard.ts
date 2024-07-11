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
    console.log(targetMethod, targetEnpoint);
    const permissions = user.apis; //{api_method:string, api_endpoint: string} get from jwt strategy
    console.log(permissions);

    const isExist = permissions.find(
      (permission) =>
        permission.api_method === targetMethod.toLowerCase() &&
        permission.api_endpoint === targetEnpoint,
    );
    if (!isExist) {
      throw new ForbiddenException(
        `You aren't allowed to access this endpoint`,
      );
    }
    return user;
  }
}
