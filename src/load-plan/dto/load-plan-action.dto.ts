import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';

import { CREATE, UPDATE, DELETE } from '../../constants/constants';
import { CreateLoadPlanDto } from './create-load-plan.dto';
import { UpdateLoadPlanDto } from './update-load-plan.dto';
import { DeleteLoadPlanDto } from './delete-load-plan.dto';

export class LoadPlanActionDto {
  @IsEnum([CREATE, UPDATE, DELETE])
  @IsNotEmpty()
  @IsDefined()
  action: 'create' | 'update' | 'delete';
  data: CreateLoadPlanDto | UpdateLoadPlanDto | DeleteLoadPlanDto;
}
