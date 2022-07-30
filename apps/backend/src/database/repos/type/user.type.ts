import { Prisma } from '@prisma/client';

const userWithAdminRole = Prisma.validator<Prisma.UserArgs>()({
  include: {
    adminUser: true,
  },
});
export type UserWithAdminRole = Prisma.UserGetPayload<typeof userWithAdminRole>;

const userWithAdminRolePermission = Prisma.validator<Prisma.UserArgs>()({
  include: {
    adminUser: {
      include: {
        role: true,
      },
    },
  },
});
export type UserWithAdminRolePermission = Prisma.UserGetPayload<
  typeof userWithAdminRolePermission
>;
