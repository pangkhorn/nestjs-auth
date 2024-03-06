import { HttpError } from '@constants/http-error.constant';
import { BadRequestException } from '@nestjs/common';
import { ValidationArguments, arrayNotEmpty, isArray, isObject } from 'class-validator';

export const factory = (errors) => {
  const errs = {};
  errors.forEach((error) => {
    if (!error?.children?.length) {
      errs[error.property] = mapMsgs(error.constraints);
    } else if (arrayNotEmpty(error.children) && isArray(error.value)) {
      // Is array object
      error?.children.forEach((child) => {
        child.children?.forEach((element) => {
          errs[`${error.property}.${child.property}.${element.property}`] = mapMsgs(element.constraints);
        });
      });
    } else if (arrayNotEmpty(error.children) && isObject(error.value)) {
      // Is Object
      error.children.forEach((el) => {
        errs[`${error.property}.${el.property}`] = mapMsgs(el.constraints);
      });
    }
  });
  throw new BadRequestException({
    message: { key: 'bad_request' },
    errors: errs,
    error: HttpError.BAD_REQUEST
  });
};

function mapMsgs(constraints: any): any {
  const msgs = {};
  for (const key in constraints) {
    try {
      msgs[key] = JSON.parse(constraints[key]);
    } catch (e) {
      msgs[key] = { key: constraints[key] };
    }
  }
  return msgs;
}

export const concatVKey = (arg: ValidationArguments, key: string) => {
  return `${arg.property}.${key}`;
};
