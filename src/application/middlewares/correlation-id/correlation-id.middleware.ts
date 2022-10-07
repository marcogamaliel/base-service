import { Middleware } from "routing-controllers"
import { CorrelationIdService } from "../../services/correlation-id.service"


@Middleware({ type: "before" })
export class CorrelationIdMiddleware {
  public async use(ctx: any, next: () => Promise<any>): Promise<any> {
    CorrelationIdService.bindEmitter(ctx.req)
    CorrelationIdService.bindEmitter(ctx.res)
    CorrelationIdService.bindEmitter(ctx.req.socket)
    await new Promise((resolve, reject) => {
      CorrelationIdService.withId(() => {
        this.rebindOnFinished(ctx.res)
        const correlationId = CorrelationIdService.getId()
        ctx.set('x-correlation-id', correlationId)
        next().then(resolve).catch(reject)
      }, ctx.request.get('x-correlation-id'))
    })
  }

  private rebindOnFinished(container: any) {
    if (container.__onFinished) {
        // __onFinished is used by package (on-finished) that are used by koa itself (Application.handleRequest)
        // and morgan to run tasks once response ended
        // lib creates 1 field to store all on finish listeners in queue
        container.__onFinished = CorrelationIdService.bind(container.__onFinished);
    }
  }
}
