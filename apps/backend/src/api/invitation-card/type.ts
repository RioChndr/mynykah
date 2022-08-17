import { ApiProperty } from "@nestjs/swagger"

export class InvitationCardCreateDTO {
  @ApiProperty({ required: false })
  nameMale: string
  @ApiProperty({ required: false })
  nameFemale: string
  @ApiProperty({ required: false })
  date: Date
  @ApiProperty({ required: false })
  location: string
  @ApiProperty({ required: false })
  locationCoord: string
  // insert manual
  imageCouple: any
  imageThumbnail: any
}

export class InvitationCardUpdateDTO extends InvitationCardCreateDTO { }