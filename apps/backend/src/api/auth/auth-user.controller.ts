import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserCred } from 'src/database/repos/user.repository';
import { AuthService } from './auth.service';

@Controller('auth-user')
export class AuthUserController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: UserCred) {
    try {
      return await this.authService.login(body);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }
}
