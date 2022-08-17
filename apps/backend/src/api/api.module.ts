import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { FileModule } from './file/file.module';
import { InvitationCardModule } from './invitation-card/invitation-card.module';

@Module({
  imports: [
    InvitationCardModule,
    FileModule
  ],
  controllers: [ApiController],
})
export class ApiModule { }
