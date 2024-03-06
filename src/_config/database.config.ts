import { Transactions, Users, WalletHolders, Wallets } from '@infrastructures/io/entity';
import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export default (_entities: string) =>
  registerAs(
    'database',
    (): DataSourceOptions => ({
      type: (process.env.DB_DRIVER || 'postgres') as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      database: process.env.DB_DATABASE || 'test',
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      applicationName: process.env.DB_APPLICATION_NAME || 'recruitment-service',
      useUTC: true,
      entities: [_entities],
      synchronize: false,
      logging: false
    })
  );

export const Entities = [Users, Wallets, WalletHolders, Transactions];
