import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export const redisConfig = (config: string) =>
  registerAs(config, () => ({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD || 'scret'
    }
  }));
