import { AdapterConfig } from './model/adapter-config.service'
import { ServiceConfig } from './model/service-config.service'

export interface ConfigService {
  get<T>(key: string): T | undefined
  getAdapter(key: string): AdapterConfig
  getService(key: string): ServiceConfig
}
