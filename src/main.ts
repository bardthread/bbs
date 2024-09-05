import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import * as hbs from "hbs";
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  // アプリケーションインスタンス作成
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    cors: true,
    logger: ['log', 'error', 'warn', 'debug']
  });
  // ファイルアクセス許可
  app.useStaticAssets(join(__dirname, '../node_modules/bootstrap/dist'), { prefix: '/bootstrap' });
  app.useStaticAssets(join(__dirname, '../node_modules/htmx.org/dist'), { prefix: '/htmx' });
  app.useStaticAssets(join(__dirname, '../public'), { prefix: '/public' });
  app.useStaticAssets(join(__dirname, '../templates'), { prefix: '/templates' });
  // テンプレートファイルパス設定
  app.setBaseViewsDir(join(__dirname, '../templates'));
  // テンプレートエンジン設定
  app.setViewEngine('hbs');
  // テンプレート部品ファイルパス設定
  hbs.registerPartials(join(__dirname, "../templates/partials"));
  // サーバ起動
  await app.listen(3000);
}
bootstrap();
