import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { logger } from '../../../domain/services'

@Middleware({ type: 'before' })
export class ErrorHandlerMiddleware implements KoaMiddlewareInterface {

  public async use(ctx: any, next: () => Promise<any>): Promise<any> {
    await next()
    if (ctx.status >= 300) this.processError(ctx)
  }

  private processError(ctx: any): void {
    const message = ctx.body?.message ?? ctx.response?.message ?? 'Something went wrong'
    logger.error(JSON.stringify(ctx.body ?? message))

    if (/Invalid body-param/.test(ctx.body?.message)) this.processValidationError(ctx)
    else {
      ctx.status = ctx.body?.status || ctx.status
      ctx.body = { message }
    }
  }

  private processValidationError(ctx: any): void {
    ctx.status = ctx.body.httpCode || 400
    const errors: string[] = []
    ctx.body.errors.forEach((error: any) => {
      errors.push(error.property)
    })
    ctx.body = { message: `Please check the following properties: ${errors.join(', ')}` }
  }
}
