import { Get, JsonController } from "routing-controllers"
import { logger } from "../services/logger.service"

@JsonController('/example')
export class ExampleController {
  @Get('/')
  public async getExample(): Promise<string> {
    logger.info('ExampleController.getExample()')
    return 'example'
  }
}
