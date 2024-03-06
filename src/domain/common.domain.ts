import { Provider } from '@nestjs/common';
import { AUTH_SERVICE } from './service';
import { AuthService } from './service/impl';

export const commonsDomain: Provider[] = [{ provide: AUTH_SERVICE, useClass: AuthService }];
