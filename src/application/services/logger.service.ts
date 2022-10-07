import winston from "winston"
import { Logger } from "../../domain/model/logger.model"
import { CorrelationIdService } from "./correlation-id.service"

class LoggerFactory {
  create(getCorrelationId: () => string): Logger {
    return winston.createLogger({
      format: winston.format.combine(
        winston.format((info) => {
          info.correlationId = getCorrelationId() || 'no-correlation-id'
          return info
        })(),
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.printf(({timestamp, level, message, correlationId}) => `${timestamp} ${level} [${correlationId}] ${message}`),
      ),
      level: process.env.LOG_LEVEL ?? 'info',
      transports: [
        new winston.transports.Console({
          handleExceptions: true,
        }),
      ],
      exitOnError: false,
    })
  }
}

export const logger = new LoggerFactory().create(CorrelationIdService.getId)