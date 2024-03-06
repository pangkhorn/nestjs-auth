import { ILoginAuthService, ILoginServiceResponse } from '@shares/type/auth.interface';

export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface IAuthService {
  login(dto: ILoginAuthService): Promise<ILoginServiceResponse>;
}
