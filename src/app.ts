import { createKoaServer } from 'routing-controllers'
import koaHelmet from 'koa-helmet'
import nocache from 'koajs-nocache'
import { CorsMiddleware } from './application/middlewares/cors/cors.middleware'
import { CorrelationIdMiddleware } from './application/middlewares/correlation-id/correlation-id.middleware'
import { ErrorHandlerMiddleware } from './application/middlewares/error-handler/error-hanler.middleware'
import { ExampleController } from './application/controllers/example.controller'
import { config, logger } from './domain/services'

const controllers: any[] = [
  ExampleController,
]
const middlewares: any[] = [
  ErrorHandlerMiddleware,
  CorsMiddleware,
  CorrelationIdMiddleware,
]

const app = createKoaServer({
  controllers,
  middlewares,
  validation: true,
})

app.init = (): void => {
  const port = config.get<number>('PORT') || 3000
  app.listen(port)
  app.use(koaHelmet)
  app.use(nocache)
  logger.info(`Server listening on port ${port}`)
}

app.boot = (): void => {
  app.emit('application:booted')
}

export default app
