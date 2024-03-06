import databaseConfig, { Entities } from '@configs/database.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { exportsIO } from './export.io';
import { providersIO } from './provider.io';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig(__dirname + '/**/*.entity{.ts,.js}')]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature(Entities)
  ],
  providers: providersIO,
  exports: exportsIO
})
export class IOModule {}
