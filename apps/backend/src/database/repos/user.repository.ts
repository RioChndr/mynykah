import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';
import { DbConnectorService } from '../connector/db-connector.service';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { UserWithAdminRole } from './type/user.type';

@Injectable()
export class UserRepository {
  constructor(private dbService: DbConnectorService) {}

  user() {
    return this.dbService.user;
  }

  hideCred(user: UserWithAdminRole | User) {
    delete user.password;
  }

  async register(user: Prisma.UserCreateInput) {
    if (user.password) {
      user.password = await this.hashPassword(user.password);
    }
    if (await this.findUser({ email: user.email })) {
      throw new EmailRegisteredException();
    }

    const resultCreate = await this.user().create({
      data: user,
    });
    this.hideCred(resultCreate);

    return resultCreate;
  }

  async login(userCred: UserCred) {
    const { email, password } = userCred;
    if (!email || !password) throw 'Credential is empty';

    const user = await this.findUser({ email }, false);
    if (!user) throw new UserNotFoundException();

    const isValid = await this.validatePassword(password, user.password);
    if (!isValid) throw new PasswordNotMatchException();
    this.hideCred(user);

    return user;
  }

  async findUser(
    selectUser: { [key in keyof User]?: any },
    excludePassword = true,
  ) {
    const user = await this.user().findUnique({
      where: selectUser,
      include: {
        adminUser: true,
      },
    });
    if (!user) return null;

    if (excludePassword) this.hideCred(user);
    return user;
  }

  async changePassword(userId: string, password: string) {
    const passwordHashed = await this.hashPassword(password);
    return this.user().update({
      where: { id: userId },
      data: {
        password: passwordHashed,
      },
    });
  }

  hashPassword(password: string) {
    if (!password) return null;
    return bcrypt.hash(password, bcrypt.genSaltSync());
  }

  validatePassword(passwordInput: string, passwordHashed: string) {
    if (!passwordInput || !passwordHashed) return false;
    return bcrypt.compare(passwordInput, passwordHashed);
  }
}

export class UserNotFoundException extends Error {
  name = 'UserNotFoundException';
  message = 'User not found';
}

export class PasswordNotMatchException extends Error {
  name = 'PasswordNotMatchException';
  message = 'Password are not correct';
}

export class EmailRegisteredException extends Error {
  name = 'EmailRegisteredException';
  message = 'Email has been registered';
}

// DTO user credential
export class UserCred {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
