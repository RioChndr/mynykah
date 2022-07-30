import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';

@Module({
  controllers: [ApiController],
  imports: [],
})
export class ApiModule {}
