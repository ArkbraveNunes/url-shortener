import { CreateRepository, FindByIdRepository } from '@libs/contract';
import { UserEntity } from '@user/domain/entity';

export interface UserRepositoryContract
  extends CreateRepository<UserEntity>,
    FindByIdRepository<UserEntity> {
  findByEmail({ email }: Pick<UserEntity, 'email'>): Promise<UserEntity | null>;
  updateById(id: string, user: Partial<UserEntity>): Promise<void>;
}
