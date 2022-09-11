import { Injectable } from '@nestjs/common';
import { UserCred, UserRepository } from 'src/database/repos/user.repository';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { PayloadToken } from './type';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) { }

  async login(userCred: UserCred) {
    try {
      // false will throw error
      const user = await this.userRepository.login(userCred);
      return this.signAccessToken(user);
    } catch (err) {
      throw err;
    }
  }

  async signAccessToken(user: User) {
    const payload: PayloadToken = {
      uid: user.id,
      name: user.name,
      email: user.email,
      picture: user.picture
    }
    return {
      access_token: jwt.sign(
        payload,
        process.env.SECRET_JWT,
        {
          expiresIn: '7d',
        },
      )
    }
  }
}
