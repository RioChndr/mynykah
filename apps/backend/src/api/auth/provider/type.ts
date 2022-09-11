import { ApiProperty } from "@nestjs/swagger";

export class ProviderGoogleDTO {
  @ApiProperty()
  token: string
}
