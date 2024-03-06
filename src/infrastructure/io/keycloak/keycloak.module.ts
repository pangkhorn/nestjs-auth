import { KEYCLOAK_SERVICE } from '@adaptors/service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KeycloakService } from './keycloak.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return { baseURL: config.get('AUTHORIZATION_URL') };
      }
    })
  ],
  providers: [
    {
      provide: KEYCLOAK_SERVICE,
      useClass: KeycloakService
    }
  ],
  exports: [
    {
      provide: KEYCLOAK_SERVICE,
      useClass: KeycloakService
    }
  ]
})
export class KeycloakModule {}
