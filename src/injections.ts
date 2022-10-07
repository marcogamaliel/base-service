import { Container } from "inversify"
import { WinstonLoggerFactory } from "./application/services/winston-logger.service"
import { LoggerFactory } from "./domain/services/logger-factory/logger-factory.service"

export const TYPES = {
  LoggerFactory: Symbol.for("LoggerFactory"),
}

export const container = new Container()
container.bind<LoggerFactory>(TYPES.LoggerFactory).to(WinstonLoggerFactory).inSingletonScope()