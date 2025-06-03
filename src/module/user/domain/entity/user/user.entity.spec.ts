import { faker } from '@faker-js/faker/locale/pt_BR';

import { UserEntity } from '@user/domain/entity';

describe('UserEntity', () => {
  it('should return a UserEntity instance with valid props on create()', () => {
    const user = UserEntity.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
    });

    expect(user.id).toBeDefined();
    expect(user.name).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.deletedAt).toBeUndefined();
  });
});
