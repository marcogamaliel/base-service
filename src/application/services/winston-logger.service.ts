import { injectable } from 'inversify'
import winston from 'winston'
import { Logger } from '../../domain/model/logger.model'
import { LoggerFactory } from '../../domain/services/logger-factory/logger-factory.service'
import { CorrelationIdService } from './correlation-id.service'

@injectable()
export class WinstonLoggerFactory implements LoggerFactory {
  create(): Logger {
    const environments = ['production', 'development', 'test']
    const print = environments.includes(process.env.NODE_ENV ?? '') ?
    ({timestamp, level, message, correlationId}: any) => `${timestamp} ${level} [${correlationId}] ${message}`
    : ({level, message}: any) => `${level} ${message}`

    return winston.createLogger({
      format: winston.format.combine(
        winston.format((info) => ({
          ...info,
          correlationId: CorrelationIdService.getId || 'no-correlation-id',
        }))(),
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.colorize(),
        winston.format.printf(print),
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
