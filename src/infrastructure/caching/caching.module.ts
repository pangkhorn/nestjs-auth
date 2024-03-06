import { CacheModule } from '@nestjs/cache-manager';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheConfigOptions } from './caching.option';
import { CacheConfig } from './config.model';

@Module({})
export class CachingModule {
  static config(options: CacheConfigOptions<CacheConfig>): DynamicModule {
    return {
      imports: [
        CacheModule.registerAsync({
          imports: options.imports,
          useFactory: options.useFactory,
          inject: [ConfigService]
        })
      ],
      providers: [],
      exports: [],
      module: CachingModule
    };
  }
}
