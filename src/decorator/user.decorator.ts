import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/user/user.interface';

export const UserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) : IUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
