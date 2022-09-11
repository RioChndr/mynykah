import { Logger } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

export const AdminDistLocation = join(
  __dirname,
  '..',
  '../../packages/admin/dist',
);

export function IsAdminExist() {
  return existsSync(AdminDistLocation);
}

export function CheckAdminExist() {
  if (!IsAdminExist()) {
    Logger.error(
      "Admin front end are not exist, please run 'yarn admin:build' or 'npm run admin:build'",
      'Server Init',
    );
  }
}
