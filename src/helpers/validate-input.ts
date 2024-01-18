import { HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { InputDataLoadDto } from '../load-plan-v2/dto/input-data-load.dto';

export const validateDto = async (dtoClass: any, plainObject: any) => {
  const classObject = plainToClass(dtoClass, plainObject);
  const validationErrors = await validate(classObject);

  if (validationErrors.length > 0) {
    const errorConstraints = validationErrors.map((error) => {
      return {
        key: error.property,
        constraints: error.constraints,
      };
    });
    return errorConstraints;
  }
  return null;
};

export const validateInput = async (processData: InputDataLoadDto[]) => {
  const validateMap = processData.map(async (row) => {
    return validateDto(InputDataLoadDto, row);
  });
  const validate = await Promise.all(validateMap);
  console.dir(validate, { depth: null });
  const filteredErrors = validate.filter((result) => {
    return result !== null;
  });
  if (filteredErrors.length > 0) {
    throw new HttpException(filteredErrors, HttpStatus.BAD_REQUEST);
  }
};
