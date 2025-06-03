import { ClsService } from 'nestjs-cls';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { MockProxy, mock } from 'jest-mock-extended';
import { InternalServerErrorException } from '@nestjs/common';

import { mockedUrlShortEntity } from '@test/mock';
import { UrlShortDeleteService } from './url-short.delete.service';
import { USER_MESSAGES_ERRORS } from '@common/enum';
import { RequestContextInterface } from '@common/request-context';
import { UrlShortDeleteServiceInputDto } from './url-short.delete.service.dto';
import { UrlShortRepositoryContract } from '@url-short/domain/contract';

describe('UrlShortDeleteService', () => {
  let service: UrlShortDeleteService;
  let urlShortRepository: MockProxy<UrlShortRepositoryContract>;
  let requestContextService: MockProxy<ClsService<RequestContextInterface>>;

  const updateCustomerServiceInputDto: UrlShortDeleteServiceInputDto = {
    id: mockedUrlShortEntity.id,
  };

  beforeEach(() => {
    urlShortRepository = mock();
    urlShortRepository.deleteByIdAndAuthor.mockResolvedValue();

    requestContextService = mock();
    requestContextService.get.mockReturnValue(
      faker.database.mongodbObjectId().toString(),
    );

    service = new UrlShortDeleteService(
      urlShortRepository,
      requestContextService,
    );
  });

  it('status 200 - success', async () => {
    await service.execute(updateCustomerServiceInputDto);

    expect(requestContextService.get).toHaveBeenCalledTimes(1);
    expect(urlShortRepository.deleteByIdAndAuthor).toHaveBeenCalledTimes(1);
  });

  it('error status 500 - database - internal server error', async () => {
    urlShortRepository.deleteByIdAndAuthor.mockRejectedValue(
      new InternalServerErrorException(
        USER_MESSAGES_ERRORS.INTERNAL_SERVER_ERROR,
      ),
    );

    await service
      .execute(updateCustomerServiceInputDto)
      .catch((actualError) => {
        expect(requestContextService.get).toHaveBeenCalledTimes(1);
        expect(urlShortRepository.deleteByIdAndAuthor).toHaveBeenCalledTimes(1);
        expect(actualError).toBeInstanceOf(InternalServerErrorException);
      })
      .then((resp) => expect(resp).toBeUndefined());
  });
});
