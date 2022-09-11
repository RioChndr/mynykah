import { Module } from "@nestjs/common";
import { InvitationCardGalleryController } from "./gallery/gallery.controller";
import { InvitationCardGalleryService } from "./gallery/gallery.service";
import { InvitationCardController } from "./invitation-card.controller";
import { InvitationCardService } from "./invitation-card.service";

@Module({
  controllers: [
    InvitationCardController,
    InvitationCardGalleryController,
  ],
  providers: [
    InvitationCardService,
    InvitationCardGalleryService
  ]
})
export class InvitationCardModule { }