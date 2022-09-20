import { ApiProperty, OmitType } from "@nestjs/swagger";

export class InvitationRSVPJoinDTO {
  @ApiProperty()
  cardId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  gift: number;
  @ApiProperty()
  totalPerson: number;
}

export class InvitationRSVPNotJoinDTO extends OmitType(InvitationRSVPJoinDTO, ["totalPerson"]) {
  @ApiProperty()
  reason?: string;
}
