import { InternalServerErrorException } from '@nestjs/common';
import { MockProxy, mock } from 'jest-mock-extended';

import { mockedUrlShortEntity } from '@test/mock';
import { USER_MESSAGES_ERRORS } from '@common/enum';
import { UrlRedirectService } from './url-redirect.service';
import { UrlShortRepositoryContract } from '@url-short/domain/contract';
import { UrlRedirectServiceInputDto } from './url-redirect.service.dto';

describe('UrlRedirectService', () => {
  let service: UrlRedirectService;
  let urlShortRepository: MockProxy<UrlShortRepositoryContract>;

  const urlRedirectServiceInputDto: UrlRedirectServiceInputDto = {
    shortIdentifier: mockedUrlShortEntity.shortIdentifier,
  };

  beforeEach(() => {
    urlShortRepository = mock();
    urlShortRepository.find.mockResolvedValue([mockedUrlShortEntity]);
    urlShortRepository.updateByShortIdentifier.mockResolvedValue();

    service = new UrlRedirectService(urlShortRepository);
  });

  it('status 200 - success', async () => {
    const actualResult = await service.execute(urlRedirectServiceInputDto);

    expect(urlShortRepository.find).toHaveBeenCalledTimes(1);
    expect(urlShortRepository.updateByShortIdentifier).toHaveBeenCalledTimes(1);
    expect(actualResult.id).toBeDefined();
  });

  it('error status 500 - database - internal server error', async () => {
    urlShortRepository.find.mockRejectedValue(
      new InternalServerErrorException(
        USER_MESSAGES_ERRORS.INTERNAL_SERVER_ERROR,
      ),
    );

    await service
      .execute(urlRedirectServiceInputDto)
      .catch((actualError) => {
        expect(actualError).toBeInstanceOf(InternalServerErrorException);
      })
      .then((result) => expect(result).toBe(undefined));
  });
});
