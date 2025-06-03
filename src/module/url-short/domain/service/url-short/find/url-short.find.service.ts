import { Inject, Injectable } from '@nestjs/common';

import { Service } from '@libs/contract';
import { REPOSITORY, REQUEST_CONTEXT } from '@common/enum';
import { UrlShortRepositoryContract } from '@url-short/domain/contract';
import { UrlShortFindServiceOutputDto } from '@url-short/domain/service';
import { ClsService } from 'nestjs-cls';
import { RequestContextInterface } from '@common/request-context';

@Injectable()
export class UrlShortFindService
  implements Service<string, Promise<UrlShortFindServiceOutputDto>>
{
  constructor(
    @Inject(REPOSITORY.URL_SHORT_REPOSITORY)
    private readonly repository: UrlShortRepositoryContract,
    private readonly requestContextService: ClsService<RequestContextInterface>,
  ) {}

  async execute(): Promise<UrlShortFindServiceOutputDto> {
    const userId = this.requestContextService.get<string>(
      REQUEST_CONTEXT.USER_ID,
    );
    return await this.repository.findByAuthor(userId);
  }
}
