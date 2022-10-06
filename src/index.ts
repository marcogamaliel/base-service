import 'reflect-metadata'
import app from './app'

process.on('uncaughtException', (e: Error): void => {
  console.error('Uncaugth Exception :', e)
})
process.on('unhandledRejection', (reason: any, p: any): void => {
  console.info('Unhandled Rejection.')
  console.debug('Promise', p)
  console.debug('Reason :', reason)
})

app.on('application:booted', app.init)

app.boot()
