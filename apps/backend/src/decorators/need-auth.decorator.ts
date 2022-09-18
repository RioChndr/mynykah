import { applyDecorators, createParamDecorator, ExecutionContext, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleType, Role } from './Role.decorator';
import { AuthGuard } from '../api/auth/authrorization/authorization.guard';

/**
 * Decorator to create authentication to API
 * @param role 
 * @returns 
 */
export function NeedAuth(options?: {
  role?: RoleType
  allowPass?: boolean
}) {
  const listDecorator = [ApiBearerAuth(), UseGuards(AuthGuard)];
  if (options?.allowPass) {
    listDecorator.unshift(AllowPass())
  }
  if (options?.role) {
    listDecorator.unshift(Role(options.role));
  }
  return applyDecorators(...listDecorator);
}

/**
 * Get user from token, this will return user data
 */
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export function AllowPass() {
  return SetMetadata(ALLOW_PASS_KEY, true)
}
export const ALLOW_PASS_KEY = 'allowPass';