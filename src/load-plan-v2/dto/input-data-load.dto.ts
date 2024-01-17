import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class InputDataLoadDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  color: string;

  @IsNumber()
  length: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  qty: number;

  @IsBoolean()
  @IsOptional()
  stackable: boolean;

  @IsBoolean()
  @IsOptional()
  tiltable: boolean;
}
