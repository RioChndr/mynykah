import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { NeedAuth } from 'src/decorators/need-auth.decorator';
import { RoleType } from 'src/decorators/Role.decorator';

@Controller()
export class ApiController {
  @Get('test/api')
  getTestApi() {
    return 'Hello world 123';
  }

  @NeedAuth()
  @Get('secret')
  secret(@Req() request: any) {
    return {
      message: 'hello world',
      user: request.user
    };
  }

  @NeedAuth({
    role: RoleType.ADMIN
  })
  @Get('secret-admin')
  secretAdmin(@Req() request: any) {
    return `secreet admin, hello ${JSON.stringify(request.user)}`;
  }
}
