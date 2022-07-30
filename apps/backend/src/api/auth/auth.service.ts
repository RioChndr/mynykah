import { Injectable } from '@nestjs/common';
import { UserCred, UserRepository } from 'src/database/repos/user.repository';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(userCred: UserCred) {
    try {
      // false will throw error
      const user = await this.userRepository.login(userCred);
      const token = jwt.sign(
        {
          uid: user.id,
        },
        process.env.SECRET_JWT,
        {
          expiresIn: '7d',
        },
      );
      return {
        access_token: token,
      };
    } catch (err) {
      throw err;
    }
  }
}
