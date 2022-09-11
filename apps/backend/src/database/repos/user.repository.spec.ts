import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database.module';
import {
  EmailRegisteredException,
  PasswordNotMatchException,
  UserNotFoundException,
  UserRepository,
} from './user.repository';

describe('Test User repository', () => {
  let userRepository: UserRepository;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [UserRepository],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  afterAll(() => {
    moduleRef.close();
  });

  it('model not null', () => {
    expect(userRepository.user()).not.toBeNull();
  });

  it('password user deleted', () => {
    const userTest = {
      id: '123',
      email: 'rio@gmail.com',
      password: '23',
    } as any;
    userRepository.hideCred(userTest);
    expect(userTest.password).toBeUndefined();
  });

  it('hash password', async () => {
    const password = '12345';
    const passwordHashed = await userRepository.hashPassword(password);
    expect(passwordHashed).not.toBeNull();
  });

  it('hash password return null', async () => {
    const password = null;
    const passwordHashed = await userRepository.hashPassword(password);
    expect(passwordHashed).toBeNull();
  });

  it('validate password', async () => {
    const password = '12345';
    const passwordHashed = await userRepository.hashPassword(password);
    const isValid = await userRepository.validatePassword(
      password,
      passwordHashed,
    );
    expect(isValid).toBeTruthy();
  });

  it('validate password if password null', async () => {
    const password = null;
    const passwordHashed = await userRepository.hashPassword(password);
    const isValid = await userRepository.validatePassword(
      password,
      passwordHashed,
    );
    expect(isValid).toBeFalsy();
  });

  describe('Error exception user repository', () => {
    it('Exception UserNotFoundException found', () => {
      expect(new UserNotFoundException()).toBeInstanceOf(Error);
    });
    it('Exception PasswordNotMatchException found', () => {
      expect(new PasswordNotMatchException()).toBeInstanceOf(Error);
    });
    it('Exception EmailRegisteredException found', () => {
      expect(new EmailRegisteredException()).toBeInstanceOf(Error);
    });
  });
});
