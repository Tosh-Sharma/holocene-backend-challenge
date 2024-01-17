import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoadPlanV2Service } from './load-plan-v2.service';
import { InputDataLoadDto } from './dto/input-data-load.dto';
import { validateInput } from './validate-input';

@Controller('load-plan/v2')
export class LoadPlanV2Controller {
  constructor(private readonly loadPlanV2Service: LoadPlanV2Service) {}

  @Post()
  async process(@Body() processData: InputDataLoadDto[]) {
    await validateInput(processData);
    try {
      return this.loadPlanV2Service.process(processData);
    } catch (error) {
      throw new HttpException(
        'Something went wrong in the DB transactions server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  findAll() {
    return this.loadPlanV2Service.findAll();
  }
}
