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
      const { data } = await this.httpService.axiosRef.get(`realms/${this.clientApp}/protocol/openid-connect/token`, {
        data: {
          grant_type: 'password',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          username: dto.username,
          password: dto.password
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      return data;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
