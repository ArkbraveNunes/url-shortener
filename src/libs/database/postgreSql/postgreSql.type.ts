import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { PostgresSqlConfigOptions } from './postgreSql.interface';

export type PostgreSqlAsyncConfigOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<PostgresSqlConfigOptions>, 'useFactory' | 'inject'>;
