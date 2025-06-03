import { IsDefined, IsNumber, IsString } from 'class-validator';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { ApiProperty } from '@nestjs/swagger';

import { URL_SHORT_ERRORS } from '@common/enum';
import { BadRequestErrorOutputDto } from '@libs/common-dto';
import { UrlShortCreateServiceOutputDto } from '@url-short/domain/service';

export class UrlShortCreateInputDto {
  @ApiProperty({ example: faker.internet.url() })
  @IsDefined({ message: URL_SHORT_ERRORS.URL_IS_REQUIRED })
  @IsString({ message: URL_SHORT_ERRORS.URL_IS_INVALID })
  url: string;
}

export class UrlShortCreateOutputDto {
  @ApiProperty({ example: faker.string.uuid() })
  @IsString()
  id: string;

  @ApiProperty({ example: faker.internet.url() })
  @IsDefined({ message: URL_SHORT_ERRORS.ORIGIN_URL_IS_REQUIRED })
  @IsString({ message: URL_SHORT_ERRORS.ORIGIN_URL_IS_INVALID })
  originUrl: string;

  @ApiProperty({ example: faker.internet.url() })
  @IsDefined({ message: URL_SHORT_ERRORS.SHORT_URL_IS_REQUIRED })
  @IsString({ message: URL_SHORT_ERRORS.SHORT_URL_IS_INVALID })
  shortUrl: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  @IsDefined({ message: URL_SHORT_ERRORS.SHORT_IDENTIFIER_IS_REQUIRED })
  @IsString({ message: URL_SHORT_ERRORS.SHORT_IDENTIFIER_IS_INVALID })
  shortIdentifier: string;

  @ApiProperty({ example: faker.number.int() })
  @IsDefined({ message: URL_SHORT_ERRORS.NUMBER_OF_HITS_IS_REQUIRED })
  @IsNumber({}, { message: URL_SHORT_ERRORS.NUMBER_OF_HITS_IS_INVALID })
  numberOfHits: number;

  constructor(input: UrlShortCreateServiceOutputDto) {
    Object.assign(this, {
      id: input.id,
      originUrl: input.originUrl,
      shortUrl: input.shortUrl,
      shortIdentifier: input.shortIdentifier,
      numberOfHits: input.numberOfHits,
    });
  }
}

export class UrlShortCreateBadRequestOutputDto extends BadRequestErrorOutputDto {
  @ApiProperty({
    example: [
      URL_SHORT_ERRORS.URL_IS_REQUIRED,
      URL_SHORT_ERRORS.URL_IS_INVALID,
    ],
  })
  declare message: URL_SHORT_ERRORS[];
}
