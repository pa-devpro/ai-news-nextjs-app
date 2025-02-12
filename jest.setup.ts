import 'openai/shims/node';
import 'whatwg-fetch';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom';
import {
  ReadableStream,
  TextDecoderStream,
  TextEncoderStream,
} from 'node:stream/web';

// Add Web API implementations to global scope
if (typeof global.ReadableStream === 'undefined') {
  global.ReadableStream =
    ReadableStream as unknown as typeof global.ReadableStream;
  global.TextDecoderStream =
    TextDecoderStream as unknown as typeof global.TextDecoderStream;
  global.TextEncoderStream =
    TextEncoderStream as unknown as typeof global.TextEncoderStream;
}
// Mocking the global fetch API
global.promisifiedSetImmediate = (
  callback: (...args: unknown[]) => void,
  ...args: unknown[]
) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      callback(...args);
      resolve();
    }, 0);
  });
};
