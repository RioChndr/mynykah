import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDTO {
  @ApiProperty()
  email: string;
}

export class VerifyTokenDTO {
  @ApiProperty()
  token: string;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  newPassword: string;
}
