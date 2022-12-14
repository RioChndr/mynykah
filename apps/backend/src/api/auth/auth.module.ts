import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthAdminController } from './auth-admin.controller';
import { AuthUserController } from './auth-user.controller';
import { AuthService } from './auth.service';
import { ForgetPasswordController } from './forget-password/forget-password.controller';
import { ForgetPasswordService } from './forget-password/forget-password.service';
import { AuthUserProviderController } from './provider/auth-user-provider.controller';
import { AuthUserProviderService } from './provider/auth-user-provider.service';
import { RegisterUserController } from './register/register-user.controller';
import { RegisterUserService } from './register/register-user.service';

@Module({
  imports: [DatabaseModule, CommonModule],
  controllers: [
    AuthAdminController,
    AuthUserController,
    RegisterUserController,
    ForgetPasswordController,

    // provider
    AuthUserProviderController
  ],
  providers: [
    AuthService,
    RegisterUserService,
    ForgetPasswordService,
    AuthUserProviderService
  ],
  exports: [AuthService],
})
export class AuthModule { }
