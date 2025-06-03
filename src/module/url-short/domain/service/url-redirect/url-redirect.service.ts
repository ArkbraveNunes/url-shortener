import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Service } from '@libs/contract';
import { UrlShortRepositoryContract } from '@url-short/domain/contract';
import { REPOSITORY, URL_SHORT_ERRORS } from '@common/enum';
import { UrlShortEntity } from '@url-short/domain/entity';
import {
  UrlRedirectServiceInputDto,
  UrlRedirectServiceOutputDto,
} from './url-redirect.service.dto';

Injectable();
export class UrlRedirectService
  implements
    Service<UrlRedirectServiceInputDto, Promise<UrlRedirectServiceOutputDto>>
{
  constructor(
    @Inject(REPOSITORY.URL_SHORT_REPOSITORY)
    private readonly repository: UrlShortRepositoryContract,
  ) {}

  async execute({
    shortIdentifier,
  }: UrlRedirectServiceInputDto): Promise<UrlRedirectServiceOutputDto> {
    const urlShort = await this.findUrlShort(shortIdentifier);

    await this.incrementNumberOfHits(urlShort);

    return urlShort;
  }

  private async findUrlShort(shortIdentifier: string) {
    const [urlShort] = await this.repository.find({ shortIdentifier });

    if (!urlShort) {
      throw new NotFoundException(URL_SHORT_ERRORS.URL_NOT_FOUND);
    }

    return urlShort;
  }

  private async incrementNumberOfHits(urlShort: UrlShortEntity) {
    await this.repository.updateByShortIdentifier(urlShort.shortIdentifier, {
      numberOfHits: urlShort.numberOfHits + 1,
    });
  }
}
