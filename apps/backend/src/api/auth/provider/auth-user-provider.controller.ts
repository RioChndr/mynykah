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
    const federate = await this.authUserProviderService.loginGoogle(body)
    return this.authService.signAccessToken(federate.user)
  }
}