import { ClsService } from 'nestjs-cls';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { MockProxy, mock } from 'jest-mock-extended';
import { InternalServerErrorException } from '@nestjs/common';

import { mockedUrlShortEntity } from '@test/mock';
import { UrlShortUpdateService } from './url-short.update.service';
import { USER_MESSAGES_ERRORS } from '@common/enum';
import { RequestContextInterface } from '@common/request-context';
import { UrlShortUpdateServiceInputDto } from './url-short.update.service.dto';
import { UrlShortRepositoryContract } from '@url-short/domain/contract';

describe('UrlShortUpdateService', () => {
  let service: UrlShortUpdateService;
  let urlShortRepository: MockProxy<UrlShortRepositoryContract>;
  let requestContextService: MockProxy<ClsService<RequestContextInterface>>;

  const updateCustomerServiceInputDto: UrlShortUpdateServiceInputDto = {
    id: mockedUrlShortEntity.id,
    originUrl: faker.internet.url(),
  };

  beforeEach(() => {
    urlShortRepository = mock();
    urlShortRepository.updateByIdAndAuthor.mockResolvedValue();

    requestContextService = mock();
    requestContextService.get.mockReturnValue(
      faker.database.mongodbObjectId().toString(),
    );

    service = new UrlShortUpdateService(
      urlShortRepository,
      requestContextService,
    );
  });

  it('status 200 - success', async () => {
    await service.execute(updateCustomerServiceInputDto);

    expect(requestContextService.get).toHaveBeenCalledTimes(1);
    expect(urlShortRepository.updateByIdAndAuthor).toHaveBeenCalledTimes(1);
  });

  it('error status 500 - database - internal server error', async () => {
    urlShortRepository.updateUserProfile.mockRejectedValue(
      new InternalServerErrorException(
        USER_MESSAGES_ERRORS.INTERNAL_SERVER_ERROR,
      ),
    );

    await service
      .execute(updateCustomerServiceInputDto)
      .catch((actualError) => {
        expect(requestContextService.get).toHaveBeenCalledTimes(1);
        expect(urlShortRepository.updateByIdAndAuthor).toHaveBeenCalledTimes(1);
        expect(actualError).toBeInstanceOf(InternalServerErrorException);
      })
      .then((resp) => expect(resp).toBeUndefined());
  });
});
