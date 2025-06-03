import { InternalServerErrorException } from '@nestjs/common';
import { MockProxy, mock } from 'jest-mock-extended';

import { mockedUrlShortEntity, mockedUserEntity } from '@test/mock';

import { UserRepositoryContract } from '@user/domain/contract';
import { USER_MESSAGES_ERRORS } from '@common/enum';
import { UrlShortCreateService } from './url-short.create.service';
import { UrlShortCreateServiceInputDto } from './url-short.create.service.dto';
import { UrlShortRepositoryContract } from '@url-short/domain/contract';
import { NanoidService } from '@libs/unique-id-generator';
import { ConfigService } from '@nestjs/config';
import { ClsService } from 'nestjs-cls';
import { RequestContextInterface } from '@common/request-context';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('UrlShortCreateService', () => {
  let service: UrlShortCreateService;
  let urlShortRepository: MockProxy<UrlShortRepositoryContract>;
  let userRepository: MockProxy<UserRepositoryContract>;
  let nanoidService: MockProxy<NanoidService>;
  let configService: MockProxy<ConfigService>;
  let requestContextService: MockProxy<ClsService<RequestContextInterface>>;

  const userCreateServiceInputDto: UrlShortCreateServiceInputDto = {
    url: mockedUrlShortEntity.originUrl,
  };

  beforeEach(() => {
    urlShortRepository = mock();
    urlShortRepository.create.mockResolvedValue(void 0);
    urlShortRepository.find.mockResolvedValue([]);

    userRepository = mock();
    userRepository.findById.mockResolvedValue(mockedUserEntity);

    configService = mock();
    configService.get.mockReturnValueOnce(faker.internet.url());

    nanoidService = mock();
    nanoidService.generateCode.mockReturnValueOnce(
      mockedUrlShortEntity.shortIdentifier,
    );

    requestContextService = mock();
    requestContextService.get.mockReturnValue(
      faker.database.mongodbObjectId().toString(),
    );

    service = new UrlShortCreateService(
      urlShortRepository,
      userRepository,
      nanoidService,
      configService,
      requestContextService,
    );
  });

  it('status 200 - success', async () => {
    const actualResult = await service.execute(userCreateServiceInputDto);

    expect(nanoidService.generateCode).toHaveBeenCalledTimes(1);
    expect(urlShortRepository.create).toHaveBeenCalledTimes(1);
    expect(actualResult.id).toBeDefined();
  });

  it('error status 500 - database - internal server error', async () => {
    urlShortRepository.create.mockRejectedValue(
      new InternalServerErrorException(
        USER_MESSAGES_ERRORS.INTERNAL_SERVER_ERROR,
      ),
    );

    await service
      .execute(userCreateServiceInputDto)
      .catch((actualError) => {
        expect(actualError).toBeInstanceOf(InternalServerErrorException);
      })
      .then((result) => expect(result).toBe(undefined));
  });
});
