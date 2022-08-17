import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { RouteParent } from './route-parent';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { StorageUpload } from './utils/file/storage-upload';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    DatabaseModule,
    ApiModule,
    AuthModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', '/admin/static'),
      serveRoot: '/static',
    }),
    ConfigModule.forRoot(),
  ],
  exports: [],
})
export class AppModule { }
