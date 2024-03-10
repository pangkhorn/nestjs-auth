import { IKeycloakService } from '@adaptors/service';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoginAuthService } from '@shares/type/auth.interface';

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
    try {
      const url = 'http://localhost:8080/realms/nest-auth/protocol/openid-connect/token';
      const form = new FormData();
      form.set('grant_type', 'password');
      form.set('client_id', this.clientId);
      form.set('client_secret', this.clientSecret);
      form.set('username', dto.username);
      form.set('password', dto.password);
      const { data } = await this.httpService.axiosRef.post(url, {
        data: form,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      return data;
    } catch (error) {
      console.log(error.response.data);

      throw new BadRequestException();
    }
  }
}
