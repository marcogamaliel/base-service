import { TYPES, container } from '../../injections'
import { ConfigService } from './support/config/config.service'
import { LoggerFactory } from './support/logger-factory/logger-factory.service'

export const logger = container.get<LoggerFactory>(TYPES.LoggerFactory).create()
export const config = container.get<ConfigService>(TYPES.ConfigService)
