import { Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export abstract class BaseService {
  protected readonly logger: Logger;
  protected readonly eventEmitter: EventEmitter2;

  public constructor(serviceClassName: string) {
    this.logger = new Logger(serviceClassName);
  }

  protected createLog<T>(logName: string, logActivity: T): void {
    this.eventEmitter.emit(logName, logActivity);
  }
}
