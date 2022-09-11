import { DatabaseModule } from 'src/database/database.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserCred } from 'src/database/repos/user.repository';
import { AuthUserController } from './auth-user.controller';
import { AuthService } from './auth.service';
import { BadRequestException } from '@nestjs/common';

describe('Test login auth user', () => {
  let authUserController: AuthUserController;
  let authService: AuthService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [AuthUserController],
      providers: [AuthService],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authUserController = moduleRef.get<AuthUserController>(AuthUserController);
  });

  afterAll(() => {
    moduleRef.close();
  });

  describe('Test login', () => {
    it('test login success', async () => {
      const result = {
        access_token: 'token',
      };
      jest.spyOn(authService, 'login').mockReturnValue(Promise.resolve(result));
      const testUser: UserCred = {
        email: 'riochandra4@gmail.com',
        password: '12345',
      };
      expect(await authUserController.login(testUser)).toBe(result);
    });
    it('test login null email', async () => {
      const testUser: UserCred = {
        email: null,
        password: '12345',
      };
      try {
        await authUserController.login(testUser);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    it('test login null password', async () => {
      const testUser: UserCred = {
        email: 'riochandra4@gmail.com',
        password: null,
      };
      try {
        await authUserController.login(testUser);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
    it('test login null password and email', async () => {
      const testUser: UserCred = {
        email: null,
        password: null,
      };
      try {
        await authUserController.login(testUser);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('Test API Login', () => {});
});
