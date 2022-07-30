import { Injectable } from '@nestjs/common';
import { TokenVerify, User } from '@prisma/client';
import { generateToken } from 'src/utils/function';
import { DbConnectorService } from '../connector/db-connector.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokenVerifyRepository {
  constructor(private dbService: DbConnectorService) {}

  model() {
    return this.dbService.tokenVerify;
  }

  async generateAndSave(user: User) {
    const token = generateToken();
    await this.saveToken(token, user.id);
    return token;
  }

  async saveToken(token: string, userId: string) {
    const salt = 12;
    const hashedToken = await bcrypt.hash(token, salt);
    const expiredAt = this.getExpiredTime();
    const tokenVerifyDataUpdate = {
      token: hashedToken,
      expiredAt,
      accessTime: 0,
    };
    const tokenVerifyDataCreate = {
      user: {
        connect: {
          id: userId,
        },
      },
      ...tokenVerifyDataUpdate,
    };

    return await this.model().upsert({
      create: tokenVerifyDataCreate,
      update: tokenVerifyDataUpdate,
      where: {
        userId: userId,
      },
    });
  }

  async verifyToken(token: string, userId: string) {
    const tokenSaved = await this.findTokenUser(userId);
    if (!tokenSaved) throw new TokenUserNotFoundException();

    await this.incrementAccess(tokenSaved);

    const isMatch = await bcrypt.compare(token, tokenSaved.token);
    if (!isMatch) throw new TokenNotValidException();

    const isNotExpired = this.isNotExpired(tokenSaved.expiredAt);
    if (!isNotExpired) throw new TokenExpiredException();

    const isAccessable = this.isAccessable(tokenSaved.accessTime);
    if (!isAccessable) throw new TokenExpiredException();

    await this.removeToken(tokenSaved.id);

    return true;
  }

  getExpiredTime() {
    const expiredMinutes = 3;
    const now = new Date();
    return new Date(now.getTime() + 1000 * 60 * expiredMinutes);
  }

  isNotExpired(timeout: Date) {
    return new Date().getTime() < timeout.getTime();
  }

  isAccessable(accessTime: number) {
    const maxAccess = 50;
    return accessTime < maxAccess;
  }

  findTokenUser(userId: string) {
    return this.model().findUnique({
      where: {
        userId: userId,
      },
    });
  }

  incrementAccess(tokenSaved: TokenVerify) {
    return this.model().update({
      data: {
        accessTime: tokenSaved.accessTime ? tokenSaved.accessTime + 1 : 1,
      },
      where: {
        id: tokenSaved.id,
      },
    });
  }

  removeToken(id: number) {
    return this.model().delete({
      where: {
        id,
      },
    });
  }
}

export class TokenUserNotFoundException extends Error {
  name = 'TokenUserNotFoundException';
  message = 'This user are not request token';
}

export class TokenNotValidException extends Error {
  name = 'TokenNotValidException';
  message = 'Token are not valid';
}

export class TokenExpiredException extends Error {
  name = 'TokenExpiredException';
  message = 'Token are expired';
}
