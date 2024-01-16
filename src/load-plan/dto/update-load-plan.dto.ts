import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

import { CreateLoadPlanDto } from './create-load-plan.dto';

export class UpdateLoadPlanDto extends PartialType(CreateLoadPlanDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
