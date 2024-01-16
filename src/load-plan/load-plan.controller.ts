import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { CREATE, DELETE, UPDATE } from 'src/constants/constants';
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
    loadPlanActions: LoadPlanActionDto[],
  ) {
    const validatedActions = loadPlanActions.map(async (action) => {
      if (action.action === CREATE) {
        return validateDto(CreateLoadPlanDto, action.data);
      } else if (action.action === UPDATE) {
        return validateDto(UpdateLoadPlanDto, action.data);
      } else if (action.action === DELETE) {
        return validateDto(DeleteLoadPlanDto, action.data);
      }
    });
    const validatedActionsResults = await Promise.all(validatedActions);
    const filteredErrors = validatedActionsResults.filter((result) => {
      return result !== null;
    });
    if (filteredErrors.length > 0) {
      const errors = filteredErrors[0]?.filter((result) => {
        if ((result as { isValidationError?: boolean })?.isValidationError) {
          return true;
        }
        return false;
      });
      if (errors && errors.length > 0) {
        throw new HttpException(
          {
            validationErrors: errors,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const result = await this.loadPlanService.handleActions(loadPlanActions);
    return result;
  }
}
