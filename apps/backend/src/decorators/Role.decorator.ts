import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'Role Metadata Key';

export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const Role = (role: RoleType) => SetMetadata(ROLE_KEY, role);

export const RoleOnlyAdmin = () => Role(RoleType.ADMIN);

export const RoleOnlyUser = () => Role(RoleType.USER);
