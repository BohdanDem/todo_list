import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CustomConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath: [`environments/${process.env.NODE_ENV}.env`],
      envFilePath: [`environments/local.env`],
    }),
  ],
  providers: [ConfigService, CustomConfigService],
  exports: [ConfigService, CustomConfigService],
})
export class CustomConfigModule {}
