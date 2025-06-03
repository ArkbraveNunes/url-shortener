import { MockProxy, mock } from 'jest-mock-extended';
import { InternalServerErrorException } from '@nestjs/common';

import { USER_MESSAGES_ERRORS } from '@common/enum';
import { mockedUrlShortEntity } from '@test/mock';
import { UrlShortCreateService } from '@url-short/domain/service';
import {
  UrlShortCreateController,
  UrlShortCreateInputDto,
} from '@url-short/application/controller';

describe('UrlShortCreateController', () => {
  let controller: UrlShortCreateController;
  let mockedUserCreateService: MockProxy<UrlShortCreateService>;

  const urlShortCreateInputDto: UrlShortCreateInputDto = {
    url: mockedUrlShortEntity.originUrl,
  };

  beforeEach(() => {
    mockedUserCreateService = mock();
    mockedUserCreateService.execute.mockResolvedValue(mockedUrlShortEntity);
  });

  beforeEach(() => {
    controller = new UrlShortCreateController(mockedUserCreateService);
  });

  describe('create', () => {
    it('should call UrlShortCreateService - success', async () => {
      await controller.execute(urlShortCreateInputDto);

      expect(mockedUserCreateService.execute).toHaveBeenCalledTimes(1);
    });

    it('should call UrlShortCreateService - error', async () => {
      mockedUserCreateService.execute.mockRejectedValue(
        new InternalServerErrorException(
          USER_MESSAGES_ERRORS.INTERNAL_SERVER_ERROR,
        ),
      );

      await controller.execute(urlShortCreateInputDto).catch((actualError) => {
        expect(mockedUserCreateService.execute).toHaveBeenCalledTimes(1);
        expect(actualError).toBeInstanceOf(InternalServerErrorException);
      });
    });
  });
});
