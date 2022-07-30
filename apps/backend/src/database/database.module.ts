import { Global, Module } from '@nestjs/common';
import { DbConnectorService } from './connector/db-connector.service';
import { TokenVerifyRepository } from './repos/token-verify.repository';
import { UserRepository } from './repos/user.repository';

@Global()
@Module({
  providers: [DbConnectorService, UserRepository, TokenVerifyRepository],
  exports: [DbConnectorService, UserRepository, TokenVerifyRepository],
})
export class DatabaseModule {}
