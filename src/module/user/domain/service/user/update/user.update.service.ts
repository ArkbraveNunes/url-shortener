import { Inject, Injectable } from '@nestjs/common';

import { UserUpdateServiceInputDto } from './user.update.service.dto';
import { Service } from '@libs/contract';
import { UserRepositoryContract } from '@user/domain/contract';
import { REPOSITORY } from '@common/enum';

@Injectable()
export class UserUpdateService
  implements Service<UserUpdateServiceInputDto, Promise<void>>
{
  constructor(
    @Inject(REPOSITORY.USER_REPOSITORY)
    private readonly repository: UserRepositoryContract,
  ) {}

  async execute({
    id: userId,
    ...userData
  }: UserUpdateServiceInputDto): Promise<void> {
    await this.repository.updateById(userId, userData);
  }
}
