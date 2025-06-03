import { UserEntity } from '@user/domain/entity';

export type UserCreateServiceInputDto = Pick<
  UserEntity,
  'name' | 'email' | 'password'
>;

export type UserCreateServiceOutputDto = {
  id: string;
};
