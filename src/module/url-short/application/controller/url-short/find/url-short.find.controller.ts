import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UrlShortFindOutputDto } from '@url-short/application/controller';
import { UrlShortFindService } from '@url-short/domain/service';
import { Auth } from '@auth/infra/adapter';
import {
  InternalServerErrorOutputDto,
  UnauthorizedErrorOutputDto,
} from '@libs/common-dto';

@ApiTags('Url Short')
@ApiBearerAuth('token')
@Controller({ version: '1' })
@UseGuards(Auth)
@ApiUnauthorizedResponse({ type: UnauthorizedErrorOutputDto })
@ApiInternalServerErrorResponse({ type: InternalServerErrorOutputDto })
export class UrlShortFindController {
  constructor(private readonly service: UrlShortFindService) {}

  @ApiOperation({
    summary: 'Get Url Short Data',
    description: 'Endpoint to get Url Short data',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UrlShortFindOutputDto })
  @Get('/url-short')
  async execute(): Promise<Array<UrlShortFindOutputDto>> {
    const urlShortList = await this.service.execute();
    return urlShortList.map((urlShort) => new UrlShortFindOutputDto(urlShort));
  }
}
