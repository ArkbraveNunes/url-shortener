import { MockProxy, mock } from 'jest-mock-extended';
import { InternalServerErrorException } from '@nestjs/common';

import { mockedUrlShortEntity } from '@test/mock';
import { USER_MESSAGES_ERRORS } from '@common/enum';
import { UrlShortFindService } from '@url-short/domain/service';
import { UrlShortFindController } from '@url-short/application/controller';

describe('UrlShortFindController', () => {
  let controller: UrlShortFindController;
  let mockedUrlShortFindService: MockProxy<UrlShortFindService>;

  beforeEach(() => {
    mockedUrlShortFindService = mock();
    mockedUrlShortFindService.execute.mockResolvedValue([mockedUrlShortEntity]);
  });

  beforeEach(() => {
    controller = new UrlShortFindController(mockedUrlShortFindService);
  });

  describe('execute', () => {
    it('should call UrlShortFindService - success', async () => {
      await controller.execute();

      expect(mockedUrlShortFindService.execute).toHaveBeenCalledTimes(1);
    });

    it('should call UserUpdateService - error', async () => {
      mockedUrlShortFindService.execute.mockRejectedValue(
        new InternalServerErrorException(
          USER_MESSAGES_ERRORS.INTERNAL_SERVER_ERROR,
        ),
      );

      await controller.execute().catch((actualError) => {
        expect(mockedUrlShortFindService.execute).toHaveBeenCalledTimes(1);
        expect(actualError).toBeInstanceOf(InternalServerErrorException);
      });
    });
  });
});
