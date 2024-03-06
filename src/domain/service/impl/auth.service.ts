import { IKeycloakService, KEYCLOAK_SERVICE } from '@adaptors/service';
import { Inject, Injectable } from '@nestjs/common';
import { ILoginAuthService, ILoginServiceResponse } from '@shares/type/auth.interface';
import { IAuthService } from '../auth.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(KEYCLOAK_SERVICE) private readonly keycloakService: IKeycloakService) {}
  login(dto: ILoginAuthService): Promise<ILoginServiceResponse> {
    return this.keycloakService.login(dto);
  }
}
