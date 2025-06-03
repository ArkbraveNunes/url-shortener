import { faker } from '@faker-js/faker/locale/pt_BR';

import { UrlShortEntity } from '@url-short/domain/entity';

describe('UrlShortEntity', () => {
  it('should return a UrlShortEntity instance with valid props on create()', () => {
    const user = UrlShortEntity.create({
      originUrl: faker.internet.url(),
      shortUrl: faker.internet.url(),
      shortIdentifier: faker.string.alphanumeric(8),
    });

    expect(user.id).toBeDefined();
    expect(user.originUrl).toBeDefined();
    expect(user.shortUrl).toBeDefined();
    expect(user.numberOfHits).toBeDefined();
    expect(user.shortIdentifier).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.deletedAt).toBeUndefined();
  });
});
