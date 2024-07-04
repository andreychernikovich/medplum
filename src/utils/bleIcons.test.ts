import { getIcon } from './bleIcons'

describe('getIcon', () => {
  it('should be falsy for an empty string', () => {
    expect(getIcon('')).toBeFalsy();
  });

  it('should return "thermometer-outline" for "Body Temperature"', () => {
    expect(getIcon('Body Temperature')).toBe('thermometer-outline');
  });

  it('should return "water-sharp" for "Humidity"', () => {
    expect(getIcon('Humidity')).toBe('water-sharp');
  });

  it('should return "reader-outline" for "Comment"', () => {
    expect(getIcon('Comment')).toBe('reader-outline');
  });

});