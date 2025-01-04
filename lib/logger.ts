const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(
      ({
        timestamp,
        level,
        message,
      }: {
        timestamp: string;
        level: string;
        message: string;
      }) => {
        return `${timestamp} ${level}: ${message}`;
      }
    )
  ),
  transports: [new transports.Console()],
});

if (typeof window === "undefined") {
  // Add file transport only on the server side
  logger.add(
    new transports.File({
      filename: "app.log",
    })
  );
}

export default logger;
