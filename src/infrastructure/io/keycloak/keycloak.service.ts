import { IKeycloakService } from '@adaptors/service';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoginAuthService } from '@shares/type/auth.interface';
import { stringify } from 'qs';

@Injectable()
export class KeycloakService implements IKeycloakService {
  clientId: string;
  clientSecret: string;
  clientApp: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService
  ) {
    this.clientId = this.config.get<string>('AUTHORIZATION_CLIENT_ID');
    this.clientSecret = this.config.get<string>('AUTHORIZATION_CLIENT_SECRET');
    this.clientApp = this.config.get<string>('AUTHORIZATION_APP_NAME');
  }
  async login(dto: ILoginAuthService): Promise<any> {
    const url = `/realms/${this.clientApp}/protocol/openid-connect/token`;
    try {
      const payload = stringify({
        grant_type: 'password',
        client_id: this.clientId,
        client_secret: this.clientSecret,
        username: dto.username,
        password: dto.password
      });
      const { data } = await this.httpService.axiosRef.post(url, payload, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
      });
      return data;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
