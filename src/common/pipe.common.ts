import { BadRequestException, HttpStatus, ParseUUIDPipe, ParseUUIDPipeOptions, PipeTransform } from '@nestjs/common';

export class ParseUUIDV4Pipe extends ParseUUIDPipe {
  constructor(options?: ParseUUIDPipeOptions) {
    super({ version: '4', errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE, ...options });
  }
}

export class ParseCodeNumberPipe implements PipeTransform {
  transform(value: any) {
    const reg = new RegExp('^[0-9]*$');
    if (!reg.test(value)) {
      throw new BadRequestException('validations.code');
    }
    return value;
  }
}
