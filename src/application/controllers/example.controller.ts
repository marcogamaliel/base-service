import { Get, JsonController } from "routing-controllers"
import { logger } from "../services"

@JsonController('/example')
export class ExampleController {
  @Get('/')
  public async getExample(): Promise<string> {
    logger.info('ExampleController.getExample()')
    return 'example'
  }
}
