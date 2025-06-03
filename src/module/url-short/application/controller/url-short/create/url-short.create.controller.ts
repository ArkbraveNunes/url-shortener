import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  UrlShortCreateInputDto,
  UrlShortCreateOutputDto,
  UrlShortCreateBadRequestOutputDto,
} from '@url-short/application/controller';
import { InternalServerErrorOutputDto } from '@libs/common-dto';
import { UrlShortCreateService } from '@url-short/domain/service';
import { OptionalAuth } from '@auth/infra/adapter';

@ApiTags('Url Short')
@ApiBearerAuth('token')
@Controller({ version: '1' })
@UseGuards(OptionalAuth)
@ApiBadRequestResponse({ type: UrlShortCreateBadRequestOutputDto })
@ApiInternalServerErrorResponse({ type: InternalServerErrorOutputDto })
export class UrlShortCreateController {
  constructor(private readonly service: UrlShortCreateService) {}

  @ApiOperation({
    summary: 'Create Url Short',
    description: 'Endpoint to create a Url Short',
  })
  @ApiCreatedResponse({
    type: UrlShortCreateOutputDto,
  })
  @Post('/url-short')
  async execute(
    @Body() bodyInput: UrlShortCreateInputDto,
  ): Promise<UrlShortCreateOutputDto> {
    return await this.service
      .execute(bodyInput)
      .then((res) => new UrlShortCreateOutputDto(res));
  }
}
