import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PostgresSqlConfigOptions } from './postgreSql.interface';
import { LoggerService } from '@libs/logger';
import { POSTGRESQL_DATABASE } from './postgreSql.enum';

@Injectable()
export class PostgreSqlDatabaseService {
  constructor(
    @Inject(POSTGRESQL_DATABASE.POSTGRESQL_CONFIG_OPTIONS)
    private readonly configParams: PostgresSqlConfigOptions,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.setContext(PostgreSqlDatabaseService.name);
  }

  getConfigs(): TypeOrmModuleOptions {
    const { dbHost, dbPort, dbUsername, dbPassword, dbName, dbEntities } =
      this.configParams;

    this.loggerService.debug(`Connecting to PostgreSQL database...`);

    return {
      type: 'postgres',
      host: dbHost,
      port: Number(dbPort),
      username: dbUsername,
      password: dbPassword,
      database: dbName,
      entities: dbEntities,
      synchronize: true,
    };
  }
}
