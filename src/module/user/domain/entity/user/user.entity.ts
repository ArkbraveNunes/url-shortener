import { v4 as uuidv4 } from 'uuid';

import { Entity } from '@libs/contract';
import { IUser } from './user.interface';

export type UserProps = IUser &
  Pick<UserEntity, 'id' | 'updatedAt' | 'createdAt' | 'deletedAt'>;

export type CreateUserProps = IUser;

export type DbUserProps = Pick<
  UserEntity,
  'id' | 'email' | 'name' | 'password'
> & {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class UserEntity extends Entity implements IUser {
  name: string;
  email: string;
  password: string;
  updatedAt: string;
  deletedAt?: string;

  constructor(props: UserProps) {
    super(props);
    Object.assign(this, props);
  }

  static create(props: CreateUserProps): UserEntity {
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const deletedAt = undefined;
    return new UserEntity({
      ...props,
      id,
      createdAt,
      updatedAt,
      deletedAt,
    });
  }

  static fromDbToEntity(props: DbUserProps): UserEntity {
    return new UserEntity({
      ...props,
      createdAt: new Date(props.createdAt).toISOString(),
      updatedAt: new Date(props.updatedAt).toISOString(),
      deletedAt: props.deletedAt
        ? new Date(props.deletedAt).toISOString()
        : undefined,
    });
  }
}
