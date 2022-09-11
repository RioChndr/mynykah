import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User, Prisma } from '@prisma/client';
import { RoleType, ROLE_KEY } from 'src/decorators/Role.decorator';
import { UserRepository } from 'src/database/repos/user.repository';
import { UserWithAdminRole } from 'src/database/repos/type/user.type';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRepository?: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization ?? null;
    if (!token) return false;
    if (token.split(' ').length < 2) return false;

    const bearerToken = token.split(' ')[1];

    const user = await this.validateToken(bearerToken);
    if (!user) return false;

    const isValidatedRole = await this.validateRole(user, context);
    if (!isValidatedRole) return false;

    // Add data user at request
    request.user = user;
    return true;
  }

  async validateToken(token: string): Promise<false | UserWithAdminRole> {
    try {
      const isValid = jwt.verify(token, process.env.SECRET_JWT);
      if (!isValid) return false;
      const decodeToken = jwt.decode(token, { json: true });

      if (!decodeToken.uid) return false;
      const user = await this.userRepository.findUser({ id: decodeToken.uid });
      if (!user) return false;

      return user;
    } catch {
      return false;
    }
  }

  async validateRole(user: UserWithAdminRole, context: ExecutionContext) {
    const roles = this.reflector.get<RoleType>(ROLE_KEY, context.getHandler());
    if (!roles) return true;

    if (roles === RoleType.ADMIN) {
      return !!user.adminUser;
    }
    if (roles === RoleType.USER) {
      return !!user;
    }
    return false;
  }
}
