import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../SkipAuth';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const endpoint: string = request.originalUrl;
    if (endpoint.includes('login') || endpoint.includes('read')) {
      return true;
    }
    const token = this.extractJwtFromHeader(request);
    request.user = token; // You can attach the token to the request object if needed
    return super.canActivate(context);
  }

  private extractJwtFromHeader(request: any): string | null {
    if (!request.headers.authorization) {
      throw new UnauthorizedException('Authorization header is missing');
    }
    const authHeader = request.headers.authorization;
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid authorization header format');
    }
    const token = parts[1];
    return token;
  }
}
