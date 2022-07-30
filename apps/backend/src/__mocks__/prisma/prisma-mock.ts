import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { join } from 'path';
import { v4 } from 'uuid';

const generateDatabaseUrl = (schema: string) => {
  if (!process.env.DATABASE_URL) {
    throw new Error('Env DATABASE_URL is not set');
  }
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.append('schema', schema);
  return url.toString();
};

const prismaBinary = join(
  __dirname,
  '..',
  '..',
  'node_modules',
  '.bin',
  'prisma',
);

const schemaName = `test-${v4()}`;
const url = generateDatabaseUrl(schemaName);

const getPrismaInstance = (url: string) => {
  process.env.DATABASE_URL = url;
  return new PrismaClient({
    datasources: {
      db: { url },
    },
  });
};

export const prisma = getPrismaInstance(url);

beforeAll(() => {
  execSync(`${prismaBinary} db push`, {
    env: {
      ...process.env,
      DATABASE_URL: url,
    },
  });
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`,
  );
  await prisma.$disconnect();
});
