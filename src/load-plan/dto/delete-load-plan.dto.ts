import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteLoadPlanDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
