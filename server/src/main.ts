import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use((req, res, next) => {
  //   res.setHeader('Access-Control-Allow-Origin', '*');
  //   res.setHeader('Access-Control-Allow-Credentials', 'true');
  //   res.setHeader('Access-Control-Max-Age', '1800');
  //   res.setHeader('Access-Control-Allow-Headers', 'content-type');
  //   res.setHeader(
  //     'Access-Control-Allow-Methods',
  //     'PUT, POST, GET, DELETE, PATCH, OPTIONS',
  //   );
  //   next();
  // });

  app.use(cors());

  await app.listen(3000);
}
bootstrap().then();
