import { Logger } from '@nestjs/common';
import { RouteParent } from 'src/route-parent';

export function AppInitLogger() {
  const logger = new Logger('Initiate App');
  const port = process.env.PORT || 3000;
  logger.log(`App Admin run on localhost:${port}${RouteParent.admin}`);
  logger.log(`App API run on localhost:${port}${RouteParent.server.api}`);
  logger.log(
    `App Swagger run on localhost:${port}${RouteParent.server.swagger}`,
  );
  const pid = process.pid;
  logger.log(`Your pid : ${pid}`);
}
