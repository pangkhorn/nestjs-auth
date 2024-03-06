import { ILoginAuthService } from '@shares/type/auth.interface';

export const KEYCLOAK_SERVICE = 'KEYCLOAK_SERVICE';

export interface IKeycloakService {
  login(dto: ILoginAuthService): Promise<any>;
}
