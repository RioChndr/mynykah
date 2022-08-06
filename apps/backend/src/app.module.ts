import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { RouteParent } from './route-parent';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ApiModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', '/admin/static'),
      serveRoot: '/static',
    }),
    ConfigModule.forRoot(),
  ],
  exports: [],
})
export class AppModule { }
