import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/application.module';
import { HealthModule } from './application/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ApplicationModule,
    HealthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
