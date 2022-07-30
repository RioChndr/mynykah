import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserCred, UserRepository } from 'src/database/repos/user.repository';

@Injectable()
export class RegisterUserService {
  constructor(private userRepository: UserRepository) {}

  async register(user: UserCred) {
    const isEmailExist = await this.userRepository.user().findUnique({
      where: {
        email: user.email,
      },
    });
    if (isEmailExist) {
      throw new EmailExistException();
    }
    return await this.userRepository.register(user);
  }

  async sendVerifyEmail(user: User) {}

  async verifyEmail() {}
}

export class EmailExistException extends Error {
  name = 'EmailExistException';
  message = 'Email Exist, please login';
}
