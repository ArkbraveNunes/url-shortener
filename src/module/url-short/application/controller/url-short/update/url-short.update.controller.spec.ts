import { MockProxy, mock } from 'jest-mock-extended';
import { InternalServerErrorException } from '@nestjs/common';

import { mockedUrlShortEntity } from '@test/mock';
import { UrlShortUpdateService } from '@url-short/domain/service';
import {
  UrlShortUpdateController,
  UrlShortUpdateInputDto,
} from '@url-short/application/controller';
import { USER_MESSAGES_ERRORS } from '@common/enum';

describe('UrlShortUpdateController', () => {
  let controller: UrlShortUpdateController;
  let mockUrlShortUpdateService: MockProxy<UrlShortUpdateService>;

  const urlShortUpdateInputDto: UrlShortUpdateInputDto = {
    originUrl: mockedUrlShortEntity.originUrl,
  };

  beforeEach(() => {
    mockUrlShortUpdateService = mock();
    mockUrlShortUpdateService.execute.mockResolvedValue();
  });

  beforeEach(() => {
    controller = new UrlShortUpdateController(mockUrlShortUpdateService);
  });

  describe('execute', () => {
    it('should call UrlShortUpdateService - success', async () => {
      await controller.execute(mockedUrlShortEntity.id, urlShortUpdateInputDto);

      expect(mockUrlShortUpdateService.execute).toHaveBeenCalledTimes(1);
    });

    it('should call UrlShortUpdateService - error', async () => {
      mockUrlShortUpdateService.execute.mockRejectedValue(
        new InternalServerErrorException(
          USER_MESSAGES_ERRORS.INTERNAL_SERVER_ERROR,
        ),
      );

      await controller
        .execute(mockedUrlShortEntity.id, urlShortUpdateInputDto)
        .catch((actualError) => {
          expect(mockUrlShortUpdateService.execute).toHaveBeenCalledTimes(1);
          expect(actualError).toBeInstanceOf(InternalServerErrorException);
        });
    });
  });
});
