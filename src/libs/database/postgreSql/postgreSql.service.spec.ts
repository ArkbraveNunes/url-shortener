import { faker } from '@faker-js/faker/locale/pt_BR';
import { MockProxy, mock } from 'jest-mock-extended';

import { PostgreSqlDatabaseService } from './postgreSql.service';
import { LoggerService } from '@libs/logger';

describe('PostgreSqlDatabaseService', () => {
  let service: PostgreSqlDatabaseService;
  let loggerService: MockProxy<LoggerService>;

  beforeEach(() => {
    loggerService = mock();

    service = new PostgreSqlDatabaseService(
      {
        dbHost: faker.string.uuid(),
        dbName: faker.string.uuid(),
        dbPassword: faker.string.uuid(),
        dbPort: faker.number.int().toString(),
        dbUsername: faker.string.uuid(),
        dbEntities: [],
      },
      loggerService,
    );
  });

  it('should call getConfigs - success', () => {
    const result = service.getConfigs();

    expect(result.host).toBeDefined();
  });
});
