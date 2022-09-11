import { generateToken, isAllValueNotNullish } from './function';

describe('Test function.ts', () => {
  it('Test isAllValueNotNullish', () => {
    const value = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: 4,
      },
    };
    expect(isAllValueNotNullish(value)).toBeTruthy();
  });

  it('test isAllValueNotNullish param null', () => {
    expect(isAllValueNotNullish(null)).toBeFalsy();
  });

  it('Test generate token 32 length', () => {
    expect(generateToken()).toHaveLength(32 * 2);
  });
  it('Test generate token 64 length', () => {
    const length = 64;
    expect(generateToken(length)).toHaveLength(length * 2);
  });
});
