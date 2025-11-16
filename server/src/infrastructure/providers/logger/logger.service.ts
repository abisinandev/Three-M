import type { ILogger } from "./logger.interface";
import { logger } from "./winston.logger";

export class WinstonLoggerService implements ILogger {
  info(message: string): void {
    logger.info(message);
  }
  error(message: string): void {
    logger.error(message);
  }
  warn(message: string): void {
    logger.warn(message);
  }
  debug(message: string): void {
    logger.debug(message);
  }
}
