import { ApiProperty } from "@nestjs/swagger"

export class InvitationCardCreateDTO {
  @ApiProperty({ required: false })
  nameMale?: string
  @ApiProperty({ required: false })
  nameFemale?: string
  @ApiProperty({ required: false })
  date?: Date
  @ApiProperty({ required: false })
  location?: string
  @ApiProperty({ required: false })
  locationCoord?: string
  @ApiProperty({ required: false })
  agenda?: string
  imageThumbnail?: string
  information?: string
}

export class InvitationCardUpdateDTO extends InvitationCardCreateDTO {
  imageThumbnail?: string
}


export class InvitationCardThumbnailDTO {
  @ApiProperty({ required: false })
  imageThumbnail: string
}