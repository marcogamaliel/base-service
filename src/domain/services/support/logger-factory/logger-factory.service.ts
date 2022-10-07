import { Logger } from '../../../model/support/logger.model'

export interface LoggerFactory {
  create(): Logger
}
