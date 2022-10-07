import { injectable } from 'inversify'
import { DError } from '../../domain/model/support/d-error.model'
import { ConfigService } from '../../domain/services/support/config/config.service'
import { AdapterConfig } from '../../domain/services/support/config/model/adapter-config.service'
import { ServiceConfig } from '../../domain/services/support/config/model/service-config.service'

@injectable()
export class EnvConfigService implements ConfigService {
  private configuration: any

  private adapters: Map<string, AdapterConfig>

  private services: Map<string, ServiceConfig>

  constructor() {
    this.configuration = this.createConfigObject()
    const adapters: any = this.get<any>('adapters')
    const services: any = this.get<any>('SERVICES')

    this.adapters = new Map<string, AdapterConfig>(
      adapters ? Object.keys(adapters).map((key) => [key, adapters[key]]) : [],
    )
    this.services = new Map<string, ServiceConfig>(
      services ? Object.keys(services).map((key) => [key, services[key]]) : [],
    )
  }

  public get<T>(key: string): T | undefined {
    return this.configuration[key] as T
  }

  public getAdapter(key: string): AdapterConfig {
    if (!this.adapters.has(key)) throw new DError(`The adapter ${key} is not configured.`, 400)
    return this.adapters.get(key)!
  }

  public getService(key: string): ServiceConfig {
    if (!this.services.has(key)) throw new DError(`The service ${key} is not configured.`, 400)
    return this.services.get(key)!
  }

  private toCamelcase(text: string | undefined): string {
    if (!text) return ''
    return text.split('_').map((t, i): any => (i > 0 ? t[0] + t.slice(1).toLowerCase() : t.toLowerCase())).join('')
  }

  private recursiveFunc(keys: string[], array: any, value: any) {
    const key = this.toCamelcase(keys.pop())
    if (keys.length) {
      // eslint-disable-next-line no-param-reassign
      array[key] = array[key] || {}
      this.recursiveFunc(keys, array[key], value)
    // eslint-disable-next-line no-param-reassign
    } else { array[key] = value }
  }

  private createConfigObject() {
    const configs = process.env
    const { PORT, NODE_ENV, LOG_LEVEL } = configs
    return Object.keys(configs).filter((key) => /^APP__.+/.test(key))
      .reduce((array, key) => {
        this.recursiveFunc(key.replace(/^APP__/, '').split('__').reverse(), array, configs[key])
        return array
      }, {
        PORT, NODE_ENV, LOG_LEVEL,
      })
  }
}
