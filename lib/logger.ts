const { createLogger, format, transports } = require("winston");

const initializeLogger = () => createLogger({
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
  initializeLogger().add(
    new transports.File({
      filename: "app.log",
    })
  );
}

const logger = initializeLogger();
export default logger;
