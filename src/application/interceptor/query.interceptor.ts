import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { isJSON } from 'class-validator';
import { Request } from 'express';
import { forOwn, includes, isString, lowerCase } from 'lodash';
import { Observable } from 'rxjs';

@Injectable()
export class QueryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    req.query = this.cleanQuery(req.query);
    return next.handle();
  }

  private cleanQuery(query = {}): any {
    const cleanedQuery: any = query;
    forOwn(query, (val, k) => {
      // clean empty value
      if (val === '') {
        delete cleanedQuery[k];
      }
      // clean query boolean value
      else if (isString(val) && includes(['true', 'false'], lowerCase(val))) {
        cleanedQuery[k] = lowerCase(val) === 'true';
      }
      // clean json string
      else if (isJSON(val)) {
        cleanedQuery[k] = JSON.parse(val);
      }
    });
    return cleanedQuery;
  }
}
