import koaHelmet from "koa-helmet"
import nocache from "koajs-nocache"
import { createKoaServer } from "routing-controllers"
import { CorsMiddleware } from "./application/middlewares/cors/cors.middleware"
import { ErrorHandlerMiddleware } from "./application/middlewares/error-handler/error-hanler.middleware"

const controllers: any[] = []
const middlewares: any[] = [
  ErrorHandlerMiddleware,
  CorsMiddleware,
]

const app = createKoaServer({
  controllers,
  middlewares,
  validation: true
})

app.init = (): void => {
  const port = process.env.PORT || 3000
  app.listen(port)
  app.use(koaHelmet)
  app.use(nocache)
  console.log(`Server listening on port ${port}`)
}

app.boot = (): void => {
  app.emit('application:booted')
}

export default app
