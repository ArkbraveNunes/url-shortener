import { Inject, Injectable } from '@nestjs/common';

import { UrlShortDeleteServiceInputDto } from './url-short.delete.service.dto';
import { Service } from '@libs/contract';
import { UrlShortRepositoryContract } from '@url-short/domain/contract';
import { REPOSITORY, REQUEST_CONTEXT } from '@common/enum';
import { ClsService } from 'nestjs-cls';
import { RequestContextInterface } from '@common/request-context';

@Injectable()
export class UrlShortDeleteService
  implements Service<UrlShortDeleteServiceInputDto, Promise<void>>
{
  constructor(
    @Inject(REPOSITORY.URL_SHORT_REPOSITORY)
    private readonly repository: UrlShortRepositoryContract,
    private readonly requestContextService: ClsService<RequestContextInterface>,
  ) {}

  async execute({
    id: urlShortId,
  }: UrlShortDeleteServiceInputDto): Promise<void> {
    const userId = this.requestContextService.get<string>(
      REQUEST_CONTEXT.USER_ID,
    );
    await this.repository.deleteByIdAndAuthor(urlShortId, userId);
  }
}
