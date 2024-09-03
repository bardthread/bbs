import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    cors: true,
    logger: ['log', 'error', 'warn', 'debug']
  });

  app.useStaticAssets(join(__dirname, '../public'));
  app.useStaticAssets(join(__dirname, '../node_modules/bootstrap/dist'), { prefix: '/bootstrap' });
  app.setBaseViewsDir(join(__dirname, '../template'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
