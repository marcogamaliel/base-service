import 'reflect-metadata'
import app from './app'
import { logger } from './domain/services'

process.on('uncaughtException', (e: Error): void => {
  logger.error('Uncaugth Exception :', e)
})
process.on('unhandledRejection', (reason: any, p: any): void => {
  logger.info('Unhandled Rejection.')
  logger.debug('Promise', p)
  logger.debug('Reason :', reason)
})

app.on('application:booted', app.init)

app.boot()
