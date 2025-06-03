import { Inject, Injectable } from '@nestjs/common';

import { Service } from '@libs/contract';
import { REPOSITORY } from '@common/enum';
import { UserRepositoryContract } from '@user/domain/contract';
import { UserFindServiceOutputDto } from '@user/domain/service';

@Injectable()
export class UserFindService
  implements Service<string, Promise<UserFindServiceOutputDto>>
{
  constructor(
    @Inject(REPOSITORY.USER_REPOSITORY)
    private readonly userRepository: UserRepositoryContract,
  ) {}

  async execute(userId: string): Promise<UserFindServiceOutputDto> {
    return await this.userRepository.findById(userId);
  }
}
