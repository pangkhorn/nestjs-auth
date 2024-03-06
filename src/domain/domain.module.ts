import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { exportsDomain } from './export.domain';
import { providersDomain } from './provider.domain';

@Module({
  imports: [InfrastructureModule],
  providers: providersDomain,
  exports: exportsDomain
})
export class DomainModule {}
