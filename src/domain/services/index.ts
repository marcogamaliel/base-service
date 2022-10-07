import { LoggerFactory } from './logger-factory/logger-factory.service'
import { container, TYPES } from '../../injections'

export const logger = container.get<LoggerFactory>(TYPES.LoggerFactory).create()
