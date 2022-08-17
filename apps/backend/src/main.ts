import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './interceptors/Logger.interceptor';
import { AppInitLogger } from './logger/app-init.logger';
import { setupSwagger } from './utils/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors();
  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new LoggerInterceptor())
  app.enableShutdownHooks();
  setupSwagger(app, 'api');
  await app.listen(port);
  AppInitLogger();
}
bootstrap();
