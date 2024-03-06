import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter } from '@nestjs/common';
import { isArray, isNotEmptyObject } from 'class-validator';
import { Request, Response } from 'express';
import { I18nService } from 'nestjs-i18n';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter<BadRequestException> {
  constructor(private readonly i18n: I18nService) {}
  async catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const lang = ctx.getRequest().i18nLang;
    const status = exception.getStatus();
    const errors = exception.getResponse() as any;
    delete errors.statusCode;

    const errs = {};
    for (const field in errors?.errors) {
      const constraints = {};
      for (const constraint in errors?.errors[field]) {
        const error = errors?.errors[field][constraint] as {
          key: string;
          args: Record<string, any>;
        };
        try {
          constraints[constraint] = this.i18n.translate(error?.key, {
            args: error.args,
            lang
          });
        } catch (err) {
          constraints[constraint] = error;
        }
      }
      errs[field] = constraints;
    }

    let message = errors.message as {
      key: string;
      args?: Record<string, any>;
    };

    if (typeof errors === 'string') {
      message = {
        key: errors
      };
    }

    if (typeof errors?.message === 'string') {
      message = {
        key: errors.message
      };
    }

    try {
      if (isArray(message)) {
        console.log([...new Set(message)]);
      }
      message = await this.i18n.translate(message.key, {
        lang: ctx.getRequest().i18nLang,
        args: message
      });
    } catch (error) {}

    const error = {
      status,
      ...(errors || {}),
      message,
      timestamp: new Date().toISOString(),
      path: request.url
    };

    if (isNotEmptyObject(errs)) {
      error['errors'] = errs;
    }

    response.status(status).json(error);
  }
}
