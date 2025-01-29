import 'openai/shims/node';
import 'whatwg-fetch';
import '@testing-library/jest-dom';

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
