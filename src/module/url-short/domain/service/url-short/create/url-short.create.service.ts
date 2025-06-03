import { Inject, Injectable } from '@nestjs/common';

import { Service } from '@libs/contract';
import { UrlShortRepositoryContract } from '@url-short/domain/contract';
import { REPOSITORY, REQUEST_CONTEXT } from '@common/enum';
import {
  UrlShortCreateServiceInputDto,
  UrlShortCreateServiceOutputDto,
} from '@url-short/domain/service';
import { UrlShortEntity } from '@url-short/domain/entity';
import { NanoidService } from '@libs/unique-id-generator';
import { ConfigService } from '@nestjs/config';
import { ClsService } from 'nestjs-cls';
import { RequestContextInterface } from '@common/request-context';
import { UserRepositoryContract } from '@user/domain/contract';
import { UserEntity } from '@user/domain/entity';

Injectable();
export class UrlShortCreateService
  implements
    Service<
      UrlShortCreateServiceInputDto,
      Promise<UrlShortCreateServiceOutputDto>
    >
{
  constructor(
    @Inject(REPOSITORY.URL_SHORT_REPOSITORY)
    private readonly repository: UrlShortRepositoryContract,
    @Inject(REPOSITORY.USER_REPOSITORY)
    private readonly repositoryUser: UserRepositoryContract,
    private readonly nanoidService: NanoidService,
    private readonly configService: ConfigService,
    private readonly requestContextService: ClsService<RequestContextInterface>,
  ) {}

  async execute({
    url,
  }: UrlShortCreateServiceInputDto): Promise<UrlShortCreateServiceOutputDto> {
    const shortIdentifier = await this.generateUniqueShortIdentifier();
    const shortUrl = this.buildShortUrl(shortIdentifier);

    const author = await this.findAuthor();

    const urlShortEntity = UrlShortEntity.create({
      originUrl: url,
      shortUrl: shortUrl,
      shortIdentifier: shortIdentifier,
      author: author,
    });

    await this.repository.create(urlShortEntity);

    return urlShortEntity;
  }

  private async findAuthor(): Promise<UserEntity | undefined> {
    let author: UserEntity | undefined;

    const userId = this.requestContextService.get<string>(
      REQUEST_CONTEXT.USER_ID,
    );

    if (userId) {
      author = await this.repositoryUser.findById(userId);
    }

    return author;
  }

  private buildShortUrl(shortIdentifier: string): string {
    const baseUrl = this.configService.get<string>('baseUrlShortener')!;

    return `${baseUrl}/${shortIdentifier}`;
  }

  private async generateUniqueShortIdentifier(): Promise<string> {
    let shortIdentifier: string = '';
    let isNotUnique = true;

    while (isNotUnique) {
      shortIdentifier = this.nanoidService.generateCode(6);
      isNotUnique = await this.shortIdentifierIsExist(shortIdentifier);
    }

    return shortIdentifier;
  }

  private async shortIdentifierIsExist(
    shortIdentifier: string,
  ): Promise<boolean> {
    const shortIdentifierSearch = await this.repository.find({
      shortIdentifier,
    });
    return shortIdentifierSearch.length > 0;
  }
}
