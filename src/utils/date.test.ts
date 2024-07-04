import { formatBirthDate, DATE_FORMATS, formatToMonthDay, formatToTime } from './date';
import moment from 'moment';

describe('formatBirthDate', () => {
  it('should format a valid date string correctly', () => {
    expect(formatBirthDate(new Date('2024-02-20'))).toBe('2024-02-20');
  });

  it('should format an invalid date string as "Invalid date"', () => {
    expect(formatBirthDate(new Date('not a date'))).toBe('Invalid date');
  });

  it('should use the BIRTH_DATE format from DATE_FORMATS', () => {
    expect(formatBirthDate(new Date('2024-02-20'))).toBe(moment(new Date('2024-02-20')).format(DATE_FORMATS.BIRTH_DATE));
  });
});

describe('formatToMonthDay', () => {
  it('should format a valid date string correctly', () => {
    expect(formatToMonthDay('2024-02-22T12:37:36.291Z')).toBe('Feb 22');
  });

  it('should detect an incorrect format date string as "Invalid Date".', () => {
    expect(moment('2024-02-22T12:37:36', 'YYYY-MM-DDTh:mm', true).format()).toBe('Invalid date');
  });

  it('should use the MONTH_DAY format from DATE_FORMATS', () => {
    expect(formatToMonthDay('2024-02-22T12:37:36.291Z')).toBe(moment('2024-02-22T12:37:36.291Z').format(DATE_FORMATS.MONTH_DAY));
  });
});

describe('formatToTime', () => {
  it('should format a valid date string correctly', () => {
    expect(formatToTime('2024-02-22T12:37:36.291Z')).toBe('12:37 pm');
  });

  it('should use the HOUR_MINUTE format from DATE_FORMATS', () => {
    expect(formatToTime('2024-02-22T12:37:36.291Z')).toBe(moment.utc('2024-02-22T12:37:36.291Z').format(DATE_FORMATS.HOUR_MINUTE));
  });
});
