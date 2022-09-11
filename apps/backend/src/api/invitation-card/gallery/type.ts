import { ApiProperty, OmitType } from "@nestjs/swagger";

export class InvitationCardGalleryCreateDTO {
  @ApiProperty()
  cardId: string
  @ApiProperty()
  caption: string
  @ApiProperty()
  image: string
}

export class InvitationCardGalleryUpdateDTO extends OmitType(InvitationCardGalleryCreateDTO, ['cardId']) { }