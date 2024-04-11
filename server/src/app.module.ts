import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/type-orm.config';
import { CheckIdMiddleware } from './common/middleware/checkId.middleware';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfig), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckIdMiddleware).forRoutes({
      path: '/todos/:id',
      method: RequestMethod.ALL,
    });
  }
}
