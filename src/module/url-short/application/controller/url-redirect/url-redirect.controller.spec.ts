import { MockProxy, mock } from 'jest-mock-extended';
import { InternalServerErrorException } from '@nestjs/common';

import { mockedUrlShortEntity } from '@test/mock';
import { USER_MESSAGES_ERRORS } from '@common/enum';
import { UrlRedirectService } from '@url-short/domain/service';
import { UrlRedirectController } from '@url-short/application/controller';

describe('UrlRedirectController', () => {
  let controller: UrlRedirectController;
  let mockedUrlRedirectService: MockProxy<UrlRedirectService>;
  const mockedResponse: any = {
    redirect: jest.fn(),
  };

  beforeEach(() => {
    mockedUrlRedirectService = mock();
    mockedUrlRedirectService.execute.mockResolvedValue(mockedUrlShortEntity);
  });

  beforeEach(() => {
    controller = new UrlRedirectController(mockedUrlRedirectService);
  });

  describe('execute', () => {
    it('should call UrlRedirectService - success', async () => {
      await controller.execute(
        mockedUrlShortEntity.shortIdentifier,
        mockedResponse,
      );

      expect(mockedUrlRedirectService.execute).toHaveBeenCalledTimes(1);
    });

    it('should call UserUpdateService - error', async () => {
      mockedUrlRedirectService.execute.mockRejectedValue(
        new InternalServerErrorException(
          USER_MESSAGES_ERRORS.INTERNAL_SERVER_ERROR,
        ),
      );

      await controller
        .execute(mockedUrlShortEntity.shortIdentifier, mockedResponse)
        .catch((actualError) => {
          expect(mockedUrlRedirectService.execute).toHaveBeenCalledTimes(1);
          expect(actualError).toBeInstanceOf(InternalServerErrorException);
        });
    });
  });
});
