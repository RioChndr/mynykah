import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { InvitationCardModule } from './invitation-card/invitation-card.module';

@Module({
  imports: [InvitationCardModule],
  controllers: [ApiController],
})
export class ApiModule { }
