import { createLogger, format, transports } from 'winston';

const initializeLogger = () =>
  createLogger({
    level: 'info',
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf((info: import('logform').TransformableInfo) => {
        const { timestamp, level, message } = info;
        return `${timestamp} ${level}: ${message}`;
      }),
    ),
    transports: [new transports.Console()],
  });

if (typeof window === 'undefined') {
  // Add file transport only on the server side
  initializeLogger().add(
    new transports.File({
      filename: 'app.log',
    }),
  );
}

const logger = initializeLogger();
export default logger;
