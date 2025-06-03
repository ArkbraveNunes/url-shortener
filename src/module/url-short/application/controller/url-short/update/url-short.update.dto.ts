import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { BadRequestErrorOutputDto } from '@libs/common-dto';
import { URL_SHORT_ERRORS } from '@common/enum';

export class UrlShortUpdateInputDto {
  @ApiProperty({ example: faker.internet.url() })
  @IsDefined({ message: URL_SHORT_ERRORS.ORIGIN_URL_IS_REQUIRED })
  @IsString({ message: URL_SHORT_ERRORS.ORIGIN_URL_IS_INVALID })
  originUrl: string;
}

export class UrlShortUpdateBadRequestOutputDto extends BadRequestErrorOutputDto {
  @ApiProperty({
    example: [
      URL_SHORT_ERRORS.ORIGIN_URL_IS_REQUIRED,
      URL_SHORT_ERRORS.ORIGIN_URL_IS_INVALID,
    ],
  })
  declare message: URL_SHORT_ERRORS[];
}
