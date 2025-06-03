import { UserEntity } from '@user/domain/entity';

export type UserUpdateServiceInputDto = Pick<UserEntity, 'id'> &
  Partial<Pick<UserEntity, 'name' | 'email' | 'password'>>;
