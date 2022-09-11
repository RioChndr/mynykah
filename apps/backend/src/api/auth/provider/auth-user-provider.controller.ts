import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { AuthUserProviderService } from "./auth-user-provider.service";
import { ProviderGoogleDTO } from "./type";


@Controller('auth/provider')
export class AuthUserProviderController {
  constructor(
    private authUserProviderService: AuthUserProviderService,
    private authService: AuthService
  ) { }

  @Post('google')
  async google(
    @Body()
    body: ProviderGoogleDTO
  ) {
    console.log(body)
    const federate = await this.authUserProviderService.loginGoogle(body)
    console.log(federate)
    return this.authService.signAccessToken(federate.user)
  }
}