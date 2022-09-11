import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserCred } from '../../../database/repos/user.repository';
import { AuthService } from '../auth.service';
import { RegisterUserService } from './register-user.service';

@Controller('auth-user')
export class RegisterUserController {
  constructor(
    private registerUserService: RegisterUserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() body: UserCred) {
    try {
      await this.registerUserService.register({ ...body });
      const token = await this.authService.login({ ...body });
      return token;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }
}
