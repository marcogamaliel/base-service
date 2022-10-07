import { LoggerFactory } from '../../domain/services/logger-factory/logger-factory.service'
import { container, TYPES } from '../../injections'
import { CorrelationIdService } from './correlation-id.service'

export const logger = container.get<LoggerFactory>(TYPES.LoggerFactory).create(CorrelationIdService.getId)
