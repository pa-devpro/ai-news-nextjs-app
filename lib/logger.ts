/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLogger, format, transports } from 'winston';
import { TransformableInfo } from 'logform';
import TransportStream from 'winston-transport';

type SetTimeoutTransportOptions = TransportStream.TransportStreamOptions;

class SetTimeoutTransport extends TransportStream {
  constructor(opts?: SetTimeoutTransportOptions) {
    super(opts);
  }

  log(info: any, callback: () => void) {
    setTimeout(() => {
      this.emit('logged', info);
      callback();
    }, 0);
  }
}

const initializeLogger = () =>
  createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
      format.colorize(),
      format.timestamp({
        format: () => {
          const date = new Date();
          return date
            .toLocaleString('en-GB', {
              timeZone: 'Europe/Madrid', // Adjust to your local timezone
              hour12: false,
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
            .replace(',', ''); // Format to local time in ISO-like format
        },
      }),
      format.printf((info: TransformableInfo) => {
        const { timestamp, level, message } = info;
        return `${timestamp} ${level}: ${message}`;
      }),
    ),
    transports: [new transports.Console(), new SetTimeoutTransport()],
  });
const logger = initializeLogger();

if (typeof window === 'undefined') {
  // Add file transport only on the server side
  logger.add(
    new transports.File({
      filename: 'app-errors.log',
      level: 'error',
    }),
  );

  logger.add(
    new transports.File({
      filename: 'app.log',
    }),
  );
}

export default logger;
