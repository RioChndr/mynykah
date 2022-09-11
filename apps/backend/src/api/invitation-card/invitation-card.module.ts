import { Module } from "@nestjs/common";
import { InvitationCardController } from "./invitation-card.controller";
import { InvitationCardService } from "./invitation-card.service";

@Module({
  controllers: [
    InvitationCardController
  ],
  providers: [
    InvitationCardService
  ]
})
export class InvitationCardModule { }