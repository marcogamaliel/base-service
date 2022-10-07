import { Logger } from "../../model/logger.model"

export interface LoggerFactory {
  create(): Logger
}
