import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database.module';
import { TokenVerifyRepository } from './token-verify.repository';

describe('Test token-verify.repository.ts', () => {
  let tokenVerifyRepository: TokenVerifyRepository;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [TokenVerifyRepository],
    }).compile();

    tokenVerifyRepository = moduleRef.get<TokenVerifyRepository>(
      TokenVerifyRepository,
    );
  });

  afterAll(() => {
    moduleRef.close();
  });

  it('model not null', () => {
    expect(tokenVerifyRepository.model()).not.toBeNull();
  });

  describe('Test Expired time', () => {
    it('expired time is not null', () => {
      expect(tokenVerifyRepository.getExpiredTime()).not.toBeNull();
    });
    it('expired time is time', () => {
      expect(tokenVerifyRepository.getExpiredTime()).toBeInstanceOf(Date);
    });
    it('test expired time', () => {
      const timeout = tokenVerifyRepository.getExpiredTime();
      expect(tokenVerifyRepository.isNotExpired(timeout)).toBeTruthy();
    });
    it('test expired time false', () => {
      const timeout = new Date(new Date().getTime() - 1000 * 60 * 2);
      expect(tokenVerifyRepository.isNotExpired(timeout)).toBeFalsy();
    });
  });

  describe('Test isAccessable', () => {
    it('isAccessable accesstime 5 should be truth', () => {
      expect(tokenVerifyRepository.isAccessable(5)).toBeTruthy();
    });
    it('isAccessable accesstime 40 should be truth', () => {
      expect(tokenVerifyRepository.isAccessable(40)).toBeTruthy();
    });
    it('isAccessable accesstime 49 should be truth', () => {
      expect(tokenVerifyRepository.isAccessable(49)).toBeTruthy();
    });
    it('isAccessable accesstime 52 should be false', () => {
      expect(tokenVerifyRepository.isAccessable(52)).toBeFalsy();
    });
    it('isAccessable accesstime 60 should be false', () => {
      expect(tokenVerifyRepository.isAccessable(60)).toBeFalsy();
    });
  });
});
