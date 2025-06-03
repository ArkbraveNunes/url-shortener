import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import app from './config/app.config';
import { LoggerModule } from '@libs/logger';
import { MomentModule } from '@libs/moment';
import { NanoidModule } from '@libs/unique-id-generator';
import { AppConfigModule } from '@libs/config';
import database from './config/database.config';
import { PostgreSqlDatabaseModule } from '@libs/database';
import { CryptographDataModule } from '@libs/cryptograph-data';
import { User } from '@user/infra/entity';
import { UrlShort } from '@url-short/infra/entity';
import { RequestContextModule } from '@libs/request-context';

@Module({
  imports: [
    LoggerModule,
    MomentModule,
    NanoidModule,
    AppConfigModule.injectConfig({
      config: [app, database],
    }),
    PostgreSqlDatabaseModule.setConfig({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dbUsername: configService.get('database.username')!,
        dbPassword: configService.get('database.password')!,
        dbHost: configService.get('database.host')!,
        dbPort: configService.get('database.port')!,
        dbName: configService.get('database.database')!,
        dbEntities: [User, UrlShort],
      }),
    }),
    PostgreSqlDatabaseModule.init(),
    CryptographDataModule.cryptographConfig({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        numberOfSalt: configService.get('cryptographPasswordSalt')!,
      }),
    }),
    RequestContextModule.setParameters({
      parameters: [],
    }),
  ],
})
export class CommonModule {}
