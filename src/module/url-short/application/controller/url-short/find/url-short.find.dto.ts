import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { BadRequestErrorOutputDto } from '@libs/common-dto';
import { UrlShortFindServiceOutputDto } from '@url-short/domain/service';

export class UrlShortFindOutputDto {
  @ApiProperty({ example: faker.string.uuid() })
  @IsString()
  id: string;

  @ApiProperty({ example: faker.internet.url() })
  @IsString()
  originUrl: string;

  @ApiProperty({ example: faker.internet.url() })
  @IsString()
  shortUrl: string;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  @IsString()
  shortIdentifier: string;

  @ApiProperty({ example: faker.number.int() })
  @IsString()
  numberOfHits: number;

  constructor(input: UrlShortFindServiceOutputDto[number]) {
    Object.assign(this, input);
  }
}

export class UserFindBadRequestOutputDto extends BadRequestErrorOutputDto {}
