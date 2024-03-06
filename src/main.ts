import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import * as compression from 'compression';
import helmet from 'helmet';
import * as MethodOverride from 'method-override';
import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { factory } from './utility';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  setupSwagger(app);

  app.use(MethodOverride('X-HTTP-Method-Override'));
  app.use(compression());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, exceptionFactory: factory }));

  // Enable DI for class-validator
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(parseInt(process.env.PORT, 10) || 3000);
  const logger = new Logger('Nestjs API');
  const appUrl = await app.getUrl();
  logger.debug('Service is running on : ' + appUrl);
}
bootstrap();
