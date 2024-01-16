import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { VALIDATION_FAILED } from 'src/constants/constants';

export async function validateDto(dtoClass: any, plainObject: any) {
  const classObject = plainToClass(dtoClass, plainObject);
  const validationErrors = await validate(classObject);

  if (validationErrors.length > 0) {
    return VALIDATION_FAILED;
  }

  return classObject;
}
