import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RouteParent } from 'src/route-parent';

export function setupSwagger(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Swagger E Commerce Headless')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(RouteParent.server.swagger, app, document);
}
