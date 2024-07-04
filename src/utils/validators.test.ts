import { validateEmail, validatePassword } from './validators';

describe('validateEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    expect(validateEmail('hello+world@gmail.com')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(validateEmail('test')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
    expect(validateEmail('test@example')).toBe(false);
  });
});

describe('validatePassword', () => {
  it('should return true for valid passwords', () => {
    expect(validatePassword('Password123')).toBe(true);
    expect(validatePassword('Abcdefgh')).toBe(true);
    expect(validatePassword('Zyxwvuts')).toBe(true);
  });

  it('should return false for invalid passwords', () => {
    expect(validatePassword('password')).toBe(false);
    expect(validatePassword('abcdefg')).toBe(false);
    expect(validatePassword('12345678')).toBe(false);
    expect(validatePassword('Passwor')).toBe(false);
  });
});
