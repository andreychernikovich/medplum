import base64 from 'react-native-base64';

//Uint8Array([0x41, 0x42, 0x43, 0x44])
export const fromB64toByteArray = (base64String: string)=> {
  const binaryString = base64.decode(base64String);

  return Array.from(binaryString).map((char: string) => char.charCodeAt(0));
};

export const fromByteArrayToStringArray = (byteArray: Array<number>) => {
  return byteArray.map(byte => '0x' + byte.toString(16));
};

//For calculating Temperature call this function with 0,2 indexes. Divide the result by one hundred and then add °C symbol at the end.
//For calculating battery call this function with 3,5 indexes. Add mV symbols at the end.
export const fromByteArrayToNumber = (
  bytes: Array<number>,
  startIndex = 0,
  endIndex = bytes.length,
) => {
  const array = new Uint8Array(bytes.slice(startIndex, endIndex));

  let result = 0;
  for (let i = 0; i < array.length; i++) {
    result |= array[i] << (8 * i);
  }

  return result;
};

//For calculating Humidity call this function with 2 index. Add % symbol at the end.
export const fromByteToNumber = (bite: string) => parseInt(bite, 16);
