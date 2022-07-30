import { randomBytes, randomInt } from 'crypto';

export function isAllValueNotNullish(value: Record<string, any>) {
  if (!value) return false;
  return Object.values(value).every((item) => {
    if (typeof item === 'object') {
      return isAllValueNotNullish(item);
    }
    return item !== null && item !== undefined;
  });
}

export function generateToken(length = 32) {
  return randomBytes(length).toString('hex');
}
