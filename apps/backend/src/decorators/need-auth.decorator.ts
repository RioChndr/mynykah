import { applyDecorators, createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleType, Role } from './Role.decorator';
import { AuthGuard } from '../api/auth/authrorization/authorization.guard';

export function NeedAuth(role?: RoleType) {
  const listDecorator = [ApiBearerAuth(), UseGuards(AuthGuard)];
  if (role) {
    listDecorator.unshift(Role(role));
  }
  return applyDecorators(...listDecorator);
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);