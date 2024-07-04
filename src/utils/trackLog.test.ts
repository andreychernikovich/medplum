import { trackLog } from './trackLog';

describe('trackLog', () => {
  it('should log the message and data to the console', () => {
    const message = 'Hello, world!';
    const data = { foo: 'bar' };
    const consoleSpy = jest.spyOn(console, 'log');

    trackLog(message, data);

    expect(consoleSpy).toHaveBeenCalledWith(data, message);
    consoleSpy.mockRestore();
  });
});
