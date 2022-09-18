import { Module } from "@nestjs/common";
import { InvitationCardGalleryController } from "./gallery/gallery.controller";
import { InvitationCardGalleryService } from "./gallery/gallery.service";
import { InvitationCardController } from "./invitation-card.controller";
import { InvitationCardService } from "./invitation-card.service";
import { InviationRSVPController } from "./rsvp/invitation-rsvp.controller";
import { InvitationrSVPService } from "./rsvp/invitation-rsvp.service";

@Module({
  controllers: [
    InvitationCardController,
    InvitationCardGalleryController,
    InviationRSVPController
  ],
  providers: [
    InvitationCardService,
    InvitationCardGalleryService,
    InvitationrSVPService
  ]
})
export class InvitationCardModule { }