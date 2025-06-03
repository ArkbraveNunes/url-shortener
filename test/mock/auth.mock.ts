import { faker } from '@faker-js/faker/locale/pt_BR';
import * as jwt from 'jsonwebtoken';

export const mockedJwtToken = jwt.sign({ sub: faker.string.uuid() }, 'secret', {
  expiresIn: 3600,
});
