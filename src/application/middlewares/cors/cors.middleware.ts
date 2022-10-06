import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class CorsMiddleware implements KoaMiddlewareInterface {
  public async use(ctx: any, next: (err?: any) => Promise<void>): Promise<void> {
    ctx.set('Access-Control-Allow-Origin', '*') // TODO: Change this to a specific domain
    ctx.set('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS')
    await next()
  }
}
