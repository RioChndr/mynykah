import { Logger } from '@nestjs/common';
import { RouteParent } from 'src/route-parent';

export function AppInitLogger(port: string | number) {
  const logger = new Logger('Initiate App');
  logger.log(`App Admin run on http://localhost:${port}${RouteParent.admin}`);
  logger.log(`App API run on http://localhost:${port}${RouteParent.server.api}`);
  logger.log(
    `App Swagger run on http://localhost:${port}${RouteParent.server.swagger}`,
  );
  const pid = process.pid;
  logger.log(`Your pid : ${pid}`);
}
