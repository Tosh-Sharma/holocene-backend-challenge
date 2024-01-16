import {
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateLoadPlanDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsBoolean()
  @IsOptional()
  stackable: boolean;

  @IsBoolean()
  @IsOptional()
  tiltable: boolean;
}
