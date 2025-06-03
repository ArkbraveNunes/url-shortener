import { faker } from '@faker-js/faker/locale/pt_BR';
import { UrlShortEntity } from '@url-short/domain/entity';

export const mockedUrlShortEntity = UrlShortEntity.create({
  originUrl: faker.internet.url(),
  shortUrl: faker.internet.url(),
  shortIdentifier: faker.string.uuid(),
});
