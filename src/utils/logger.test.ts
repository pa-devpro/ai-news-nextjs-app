/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createLogger, transports } from 'winston';
import logger from './logger';

jest.mock('winston', () => {
  const actualWinston = jest.requireActual('winston');
  return {
    ...actualWinston,
    createLogger: jest.fn(),
  };
});

describe('Logger', () => {
  beforeAll(() => {
    logger;
  });
  it('should create a logger with console transport', () => {
    expect(createLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        transports: expect.arrayContaining([expect.any(transports.Console)]),
      }),
    );
  });

  it('should add file transport on the server side', () => {
    if (typeof window === 'undefined') {
      expect(createLogger).toHaveBeenCalledWith(
        expect.objectContaining({
          transports: expect.arrayContaining([expect.any(transports.File)]),
        }),
      );
    }
  });
});
