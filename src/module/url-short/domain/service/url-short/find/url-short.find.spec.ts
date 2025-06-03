import { ClsService } from 'nestjs-cls';
import { MockProxy, mock } from 'jest-mock-extended';
import { InternalServerErrorException } from '@nestjs/common';

import { mockedUrlShortEntity, mockedUserEntity } from '@test/mock';
import { USER_MESSAGES_ERRORS } from '@common/enum';
import { UrlShortFindService } from '@url-short/domain/service';
import { RequestContextInterface } from '@common/request-context';
import { UrlShortRepositoryContract } from '@url-short/domain/contract';

describe('UrlShortFindService', () => {
  let service: UrlShortFindService;
  let urlShortRepository: MockProxy<UrlShortRepositoryContract>;
  let requestContextService: MockProxy<ClsService<RequestContextInterface>>;

  beforeEach(() => {
    urlShortRepository = mock();
    urlShortRepository.findByAuthor.mockResolvedValue([mockedUrlShortEntity]);

    requestContextService = mock();
    requestContextService.get.mockReturnValue(mockedUserEntity.id);

    service = new UrlShortFindService(
      urlShortRepository,
      requestContextService,
    );
  });

  it('status 200 - success', async () => {
    await service.execute();

    expect(requestContextService.get).toHaveBeenCalledTimes(1);
    expect(urlShortRepository.findByAuthor).toHaveBeenCalledWith(
      mockedUserEntity.id,
    );
    expect(urlShortRepository.findByAuthor).toHaveBeenCalledTimes(1);
  });

  it('error status 500 - database - internal server error', async () => {
    urlShortRepository.findByAuthor.mockRejectedValue(
      new InternalServerErrorException(
        USER_MESSAGES_ERRORS.INTERNAL_SERVER_ERROR,
      ),
    );

    await service
      .execute()
      .catch((actualError) => {
        expect(requestContextService.get).toHaveBeenCalledTimes(1);
        expect(urlShortRepository.findByAuthor).toHaveBeenCalledTimes(1);
        expect(actualError).toBeInstanceOf(InternalServerErrorException);
      })
      .then((resp) => expect(resp).toBeUndefined());
  });
});
