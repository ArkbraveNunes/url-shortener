import { faker } from '@faker-js/faker/locale/pt_BR';
import { UserEntity } from '@user/domain/entity';

export const mockedUserEntity = UserEntity.create({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});
