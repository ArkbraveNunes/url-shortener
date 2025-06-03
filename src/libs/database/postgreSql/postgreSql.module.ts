import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PostgreSqlDatabaseService } from './postgreSql.service';
import { PostgreSqlAsyncConfigOptions } from './postgreSql.type';
import { LoggerModule } from '@libs/logger';
import { POSTGRESQL_DATABASE } from './postgreSql.enum';

@Global()
@Module({})
export class PostgreSqlDatabaseModule {
  static setConfig(configOptions: PostgreSqlAsyncConfigOptions): DynamicModule {
    return {
      module: PostgreSqlDatabaseModule,
      imports: [...configOptions.imports!, LoggerModule],
      providers: [
        {
          provide: POSTGRESQL_DATABASE.POSTGRESQL_CONFIG_OPTIONS,
          useFactory: configOptions.useFactory,
          inject: configOptions.inject,
        },
        PostgreSqlDatabaseService,
      ],
      exports: [PostgreSqlDatabaseService],
    };
  }

  static init(): DynamicModule {
    return {
      module: PostgreSqlDatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [PostgreSqlDatabaseService],
          useFactory: (
            service: PostgreSqlDatabaseService,
          ): TypeOrmModuleOptions => service.getConfigs(),
        }),
      ],
    };
  }
}
