import { createLogger, format, transports } from 'winston';
import { TransformableInfo } from 'logform';

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
    transports: [new transports.Console()],
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
