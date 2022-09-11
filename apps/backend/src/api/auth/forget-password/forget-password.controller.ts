import { Body, Controller, Get, Post } from '@nestjs/common';
import { VerifyEmailDTO, VerifyTokenDTO } from './forget-password-dto';
import { ForgetPasswordService } from './forget-password.service';

@Controller('forget-password')
export class ForgetPasswordController {
  constructor(private forgetPasswordService: ForgetPasswordService) {}

  @Post('verify-email')
  async verifyEmail(@Body() body: VerifyEmailDTO) {
    return await this.forgetPasswordService.verifyUserAndSendEmail(body);
  }

  @Post('verify-token')
  async verifyToken(@Body() body: VerifyTokenDTO) {
    return await this.forgetPasswordService.vetifyTokenAndChangePassword(body);
  }
}
