import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { UserCred } from 'src/database/repos/user.repository';
import { GetUser, NeedAuth } from 'src/decorators/need-auth.decorator';
import { AuthService } from './auth.service';

@Controller('auth-user')
export class AuthUserController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: UserCred) {
    try {
      return await this.authService.login(body);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  @NeedAuth()
  @Get('me')
  async getMe(
    @GetUser() user: any
  ) {
    console.log(user)
    return user
  }
}
