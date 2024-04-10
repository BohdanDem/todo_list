import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/type-orm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfig), TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
