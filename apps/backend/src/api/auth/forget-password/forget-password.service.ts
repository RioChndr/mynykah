import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@prisma/client';
import { MailService } from 'src/common/mail/mail.service';
import { AppConfig } from 'src/config/app.config';
import { TokenVerifyRepository } from 'src/database/repos/token-verify.repository';
import { UserRepository } from 'src/database/repos/user.repository';
import { VerifyEmailDTO, VerifyTokenDTO } from './forget-password-dto';

@Injectable()
export class ForgetPasswordService {
  constructor(
    private mailService: MailService,
    private userRepository: UserRepository,
    private tokenVerifyRepository: TokenVerifyRepository,
  ) {}

  async verifyUserAndSendEmail({ email }: VerifyEmailDTO) {
    const user = await this.userRepository.findUser({ email });
    if (!user) {
      throw new BadRequestException(`Email ${email} not found`);
    }
    const token = await this.tokenVerifyRepository.generateAndSave(user);

    await this.sendEmailToken(token, user);
    return true;
  }

  async vetifyTokenAndChangePassword(payload: VerifyTokenDTO) {
    try {
      await this.tokenVerifyRepository.verifyToken(
        payload.token,
        payload.userId,
      );
    } catch (err) {
      throw err;
    }

    await this.userRepository.changePassword(
      payload.userId,
      payload.newPassword,
    );
    return true;
  }

  private sendEmailToken(token: string, user: User) {
    return this.mailService.sendEmail({
      to: user.email,
      subject: 'Change password request',
      html: this.generateEmailHtml(token, user.id),
    });
  }

  private generateEmailHtml(token: string, userId: string) {
    const urlToken = `${AppConfig.host}/chng-password?token=${token}&uid=${userId}`;
    return `You are request to change password, click this link to change password. <a href='${urlToken}' target='_blank'>Change password</a>`;
  }
}
