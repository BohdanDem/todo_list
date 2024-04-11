import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ApiError } from './errors/ari.error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use((error: ApiError, req: Request, res: Response) => {
  //   const status = error.status || 500;
  //   res.status(status).json({
  //     message: error.message,
  //     status: error.status,
  //   });
  // });

  await app.listen(3000);
}
bootstrap().then();
