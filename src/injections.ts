import { Container } from 'inversify'
import { EnvConfigService } from './application/services/env-config.service'
import { WinstonLoggerFactory } from './application/services/winston-logger.service'
import { ConfigService } from './domain/services/support/config/config.service'
import { LoggerFactory } from './domain/services/support/logger-factory/logger-factory.service'

export const TYPES = {
  LoggerFactory: Symbol.for('LoggerFactory'),
  ConfigService: Symbol.for('ConfigService'),
}

export const container = new Container()
container.bind<LoggerFactory>(TYPES.LoggerFactory).to(WinstonLoggerFactory).inSingletonScope()
container.bind<ConfigService>(TYPES.ConfigService).to(EnvConfigService).inSingletonScope()
