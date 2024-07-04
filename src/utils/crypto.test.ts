import { 
  fromB64toByteArray,
  fromByteArrayToStringArray,
  fromByteArrayToNumber,
  fromByteToNumber
} from './crypto';

describe('fromB64toByteArray', () => {
  it('should convert a base64 string to a byte array', () => {
    const base64String = 'QUJDRA==';
    const expected = [0x41, 0x42, 0x43, 0x44];

    const actual = fromB64toByteArray(base64String);

    expect(actual).toEqual(expected);
  });
});

describe('fromByteArrayToStringArray', () => {
  it('should convert an empty array to an empty array', () => {
    expect(fromByteArrayToStringArray([])).toStrictEqual([]);
  });

  it('should convert an array of bytes to an array of hex strings', () => {
    expect(fromByteArrayToStringArray([0, 1, 15, 16, 255])).toStrictEqual([
      '0x0',
      '0x1',
      '0xf',
      '0x10',
      '0xff',
    ]);
  });
});

describe('fromByteArrayToNumber', () => {
  it('should return 0 for an empty array', () => {
    expect(fromByteArrayToNumber([])).toBe(0);
  });

  it('should return the element value for a single element array', () => {
    expect(fromByteArrayToNumber([42])).toBe(42);
  });

  it('should return the correct number for a multiple elements array', () => {
    expect(fromByteArrayToNumber([1, 2, 3, 4])).toBe(67305985);
  });

  it('should return the correct number for a subarray with start and end indices', () => {
    expect(fromByteArrayToNumber([1, 2, 3, 4, 5, 6], 1, 4)).toBe(262914);
  });
});

describe('fromByteToNumber', () => {
  it('should return correct byte number', () => {
    expect(fromByteToNumber("42")).toBe(66);
  });

  it('should return NaN for empty string', () => {
    expect(fromByteToNumber("")).toBeNaN();
  });
});

