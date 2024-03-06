import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as RequestIP from 'request-ip';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter<Error> {
  private readonly logger: Logger = new Logger(ErrorExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const uuid = (request as any)?.user?.uuid;
    const useragent = request.headers['user-agent'];
    const ip = RequestIP.getClientIp(request);
    this.logger.error(`Causer          : ${uuid}`);
    this.logger.error(`User Agent      : ${useragent}`);
    this.logger.error(`Request IP      : ${ip}`);
    this.logger.error(`Event Category  : 'unknown'`);
    this.logger.error(`Event Name      : 'unknown'`);
    this.logger.error(`Outcome         : failure`);
    console.error(exception.stack);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error.',
      error: exception.message
    });
  }
}
