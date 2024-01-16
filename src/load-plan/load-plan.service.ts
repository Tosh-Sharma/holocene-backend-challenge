import { Injectable } from '@nestjs/common';

import {
  CREATE,
  UPDATE,
  DELETE,
  INVALID_ACTION,
} from 'src/constants/constants';
import { PrismaService } from '../prisma/prisma.service';
import { LoadPlanActionDto } from './dto/load-plan-action.dto';
import { UpdateLoadPlanDto } from './dto/update-load-plan.dto';
import { DeleteLoadPlanDto } from './dto/delete-load-plan.dto';
import { CreateLoadPlanDto } from './dto/create-load-plan.dto';

@Injectable()
export class LoadPlanService {
  constructor(private prisma: PrismaService) {}

  async handleActions(actions: LoadPlanActionDto[]) {
    return this.prisma.$transaction(async (prisma) => {
      return Promise.allSettled(
        actions.map((action) => {
          switch (action.action) {
            case CREATE:
              return prisma.loadPlan.create({
                data: action.data as CreateLoadPlanDto,
              });
            case UPDATE:
              return prisma.loadPlan.update({
                where: { id: (action.data as UpdateLoadPlanDto).id },
                data: action.data,
              });
            case DELETE:
              return prisma.loadPlan.delete({
                where: { id: (action.data as DeleteLoadPlanDto).id },
              });
            default:
              return Promise.reject({
                reason: INVALID_ACTION,
              });
          }
        }),
      );
    });
  }

  async handleAction(action: LoadPlanActionDto) {
    switch (action.action) {
      case CREATE:
        return this.prisma.loadPlan.create({
          data: action.data as CreateLoadPlanDto,
        });
      case UPDATE:
        return this.prisma.loadPlan.update({
          where: { id: (action.data as UpdateLoadPlanDto).id },
          data: action.data,
        });
      case DELETE:
        return this.prisma.loadPlan.delete({
          where: { id: (action.data as DeleteLoadPlanDto).id },
        });
      default:
        return Promise.reject({
          reason: INVALID_ACTION,
        });
    }
  }
}
