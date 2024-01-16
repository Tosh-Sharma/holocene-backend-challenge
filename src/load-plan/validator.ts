import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export async function validateDto(dtoClass: any, plainObject: any) {
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
}
