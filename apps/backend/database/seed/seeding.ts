import { PrismaClient, AdminRoleUser, AdminPermission } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Run seeding
 */
async function main() {
  for (const seedName in seeds) {
    console.log(`Running seed : ${seedName}`);
    await seeds[seedName]();
    console.log(`finish seeding : ${seedName}`);
  }
}

/**
 * Function to create seed data if not exist.
 *
 * @param operator Operator prisma
 * @param data Data based on model prisma
 * @returns data
 */
const createIfNull = async <T>(operator: any, data: any | any[] | T | T[]) => {
  if (Array.isArray(data)) {
    for (const singular of data) {
      await createIfNull(operator, singular);
    }
    return;
  }

  let existed = false;
  if (data.id) {
    existed = await operator.findUnique({
      where: {
        id: data.id,
      },
    });
  }

  if (existed) {
    console.log(`data with ${data.id} founded, skip seed`);
    return existed;
  }
  const result = await operator.create({ data });
  console.log(`data with ${data.id} created.`);
  return result;
};

/**
 * List Seeders
 */
const seeds = {
  permissionUser: async () => {
    try {
      console.log('run admin role user');
      const adminRoleUser = await createIfNull<AdminRoleUser>(
        prisma.adminRoleUser,
        {
          id: 1,
          name: 'admin',
        },
      );

      console.log(`Run admin permission`);
      await createIfNull<AdminPermission>(prisma.adminPermission, [
        {
          id: 1,
          name: 'post:add',
          adminRoleUserId: adminRoleUser.id,
        },
        {
          id: 2,
          name: 'post:remove',
          adminRoleUserId: adminRoleUser.id,
        },
        {
          id: 3,
          name: 'post:edit',
          adminRoleUserId: adminRoleUser.id,
        },
      ]);
    } catch (err) {
      console.log(err);
      console.log('Failed seeding, maybe already seeded');
    }
  },
};

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
