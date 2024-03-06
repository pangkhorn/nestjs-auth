import { registerAs } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

export default (config: string, ttl = parseInt(process.env.REDIS_TTL || '0')) =>
  registerAs(config, () => ({
    ttl,
    store: redisStore,
    isGlobal: true,
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || 'secret'
  }));
