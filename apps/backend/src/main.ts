import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppInitLogger } from './logger/app-init.logger';
import { RouteParent } from './route-parent';
import { setupSwagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;
  setupSwagger(app);
  app.enableShutdownHooks();
  await app.listen(port);
  AppInitLogger();
}
bootstrap();
