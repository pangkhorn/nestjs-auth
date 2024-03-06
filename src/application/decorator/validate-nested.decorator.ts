import { ValidationError } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { registerDecorator, validateSync, ValidationArguments, ValidationOptions } from 'class-validator';

type ValidationErrorType = {
  idx: number;
  errors: ValidationError[];
};
/**
 * @decorator
 * @description A custom decorator to validate a validation-schema within a validation schema upload N levels
 * @param schema The validation Class
 */
export function ValidateNested(schema: new () => any, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'ValidateNested',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (Array.isArray(value)) {
            const errorFound = value.find((element) => shouldValidateError(schema, element));
            if (!errorFound) {
              return true;
            }
            return false;
          }
          return !shouldValidateError(schema, value);
        },
        defaultMessage(args: ValidationArguments) {
          const errors: ValidationErrorType[] = [];

          if (Array.isArray(args.value)) {
            args.value.forEach((element) => {
              shouldValidateError(schema, element) &&
                errors.push({
                  idx: args.value.indexOf(element),
                  errors: validateSync(plainToInstance(schema, element))
                });
            });
            if (errors.length) {
              let errorString = '';
              errors.forEach((e) =>
                e.errors.forEach((ev) => {
                  errorString += `${args.property}[${e.idx}].${ev.property}: ${Object.values(ev.constraints)}, `;
                })
              );
              return errorString;
            }
          }
          return (
            `${args.property}: ` +
            validateSync(plainToInstance(schema, args.value))
              .map((e) => e.constraints)
              .reduce((acc, next) => acc.concat(Object.values(next)), [])
          ).toString();
        }
      }
    });
  };
}

const shouldValidateError = (schema: any, element: any) => {
  console.log('element', element);
  return validateSync(plainToInstance(schema, element)).length > 0;
};
