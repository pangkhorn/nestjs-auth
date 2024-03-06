import cacheConfig from '@configs/cache.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CachingModule } from './caching/caching.module';
import { IOModule } from './io/io.module';
import { KeycloakModule } from './io/keycloak/keycloak.module';

@Module({
  imports: [
    IOModule,
    KeycloakModule,
    CachingModule.config({
      imports: [ConfigModule.forFeature(cacheConfig('cache'))],
      useFactory: (config: ConfigService) => config.get('cache'),
      inject: [ConfigService]
    })
  ],
  exports: [IOModule, CachingModule, KeycloakModule]
})
export class InfrastructureModule {}
