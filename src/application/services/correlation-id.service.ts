import cls, { Namespace } from 'cls-hooked'
import { EventEmitter } from 'stream'
import { v4 as uuid } from 'uuid'

export const CORRELATION_ID_KEY = 'correlation-id' as const

export abstract class CorrelationIdService {
  private static store: Namespace = cls.createNamespace('correlation-id-namespace')

  public static withId(fn: () => void, id: string): void {
    this.store.run(() => {
      this.store.set(CORRELATION_ID_KEY, id || uuid())
      fn()
    })
  }

  public static getId(): string {
    return CorrelationIdService.store.get(CORRELATION_ID_KEY)
  }

  public static bindEmitter(emitter: EventEmitter) {
    this.store.bindEmitter(emitter)
  }

  public static bind(fn: any, context?: any) {
    this.store.bind(fn, context)
  }
}
