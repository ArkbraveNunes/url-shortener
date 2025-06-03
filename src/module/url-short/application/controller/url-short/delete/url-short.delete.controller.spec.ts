import { MockProxy, mock } from 'jest-mock-extended';
import { InternalServerErrorException } from '@nestjs/common';

import { mockedUrlShortEntity } from '@test/mock';
import { UrlShortDeleteService } from '@url-short/domain/service';
import { UrlShortDeleteController } from '@url-short/application/controller';
import { USER_MESSAGES_ERRORS } from '@common/enum';

describe('UrlShortDeleteController', () => {
  let controller: UrlShortDeleteController;
  let urlShortDeleteService: MockProxy<UrlShortDeleteService>;

  beforeEach(() => {
    urlShortDeleteService = mock();
    urlShortDeleteService.execute.mockResolvedValue();
  });

  beforeEach(() => {
    controller = new UrlShortDeleteController(urlShortDeleteService);
  });

  describe('execute', () => {
    it('should call UrlShortDeleteService - success', async () => {
      await controller.execute(mockedUrlShortEntity.id);

      expect(urlShortDeleteService.execute).toHaveBeenCalledTimes(1);
    });

    it('should call UrlShortDeleteService - error', async () => {
      urlShortDeleteService.execute.mockRejectedValue(
        new InternalServerErrorException(
          USER_MESSAGES_ERRORS.INTERNAL_SERVER_ERROR,
        ),
      );

      await controller.execute(mockedUrlShortEntity.id).catch((actualError) => {
        expect(urlShortDeleteService.execute).toHaveBeenCalledTimes(1);
        expect(actualError).toBeInstanceOf(InternalServerErrorException);
      });
    });
  });
});
