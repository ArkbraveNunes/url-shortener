import { Inject, Injectable } from '@nestjs/common';

import { User } from '@user/infra/entity';
import { UserEntity } from '@user/domain/entity';
import { UserRepositoryContract } from '@user/domain/contract';
import { Repository } from 'typeorm';
import { ENTITY } from '@common/enum/entity.enum';

@Injectable()
export class UserRepository implements UserRepositoryContract {
  constructor(
    @Inject(ENTITY.USER)
    private readonly repository: Repository<User>,
  ) {}

  async create(user: UserEntity): Promise<void> {
    const newUser = this.repository.create({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });

    await this.repository.save(newUser);
  }

  async findById(id: string): Promise<UserEntity> {
    const docResult = await this.repository.findOneByOrFail({ id: id });

    return UserEntity.fromDbToEntity(docResult);
  }

  async findByEmail({
    email,
  }: Pick<UserEntity, 'email'>): Promise<UserEntity | null> {
    const docResult = await this.repository.findOneBy({
      email,
    });
    return docResult ? UserEntity.fromDbToEntity(docResult) : null;
  }

  async updateById(id: string, user: Partial<UserEntity>): Promise<void> {
    await this.repository.update(id, {
      ...(user.email && { email: user.email }),
      ...(user.name && { name: user.name }),
    });
  }
}
