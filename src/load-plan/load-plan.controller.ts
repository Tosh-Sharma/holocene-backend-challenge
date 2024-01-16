import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import {
  CREATE,
  DELETE,
  UPDATE,
  VALIDATION_FAILED,
} from 'src/constants/constants';
import { LoadPlanService } from './load-plan.service';
import { LoadPlanActionDto } from './dto/load-plan-action.dto';

import { validateDto } from './validator';
import { CreateLoadPlanDto } from './dto/create-load-plan.dto';
import { UpdateLoadPlanDto } from './dto/update-load-plan.dto';
import { DeleteLoadPlanDto } from './dto/delete-load-plan.dto';

@Controller('load-plan')
export class LoadPlanController {
  constructor(private readonly loadPlanService: LoadPlanService) {}

  @Post()
  async handleLoadPlanActions(
    @Body()
    actions: LoadPlanActionDto[],
  ) {
    const validatedActions = actions.map(async (action) => {
      if (action.action === CREATE) {
        return validateDto(CreateLoadPlanDto, action.data);
      } else if (action.action === UPDATE) {
        return validateDto(UpdateLoadPlanDto, action.data);
      } else if (action.action === DELETE) {
        return validateDto(DeleteLoadPlanDto, action.data);
      }
    });
    const validatedActionsResults = await Promise.all(validatedActions);
    const errorFilters = validatedActionsResults.filter((result) => {
      return result === VALIDATION_FAILED;
    });
    if (errorFilters.length > 0) {
      throw new HttpException(VALIDATION_FAILED, HttpStatus.BAD_REQUEST);
    }
    const result = await this.loadPlanService.handleActions(actions);
    console.dir(result, { depth: null });
    return result;
  }
}
