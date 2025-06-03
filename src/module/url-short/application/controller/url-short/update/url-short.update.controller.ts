import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  UrlShortUpdateBadRequestOutputDto,
  UrlShortUpdateInputDto,
} from '@url-short/application/controller';
import { UrlShortUpdateService } from '@url-short/domain/service';
import { Auth } from '@auth/infra/adapter';
import {
  InternalServerErrorOutputDto,
  UnauthorizedErrorOutputDto,
} from '@libs/common-dto';

@ApiTags('Url Short')
@ApiBearerAuth('token')
@Controller({ version: '1' })
@UseGuards(Auth)
@ApiBadRequestResponse({ type: UrlShortUpdateBadRequestOutputDto })
@ApiUnauthorizedResponse({ type: UnauthorizedErrorOutputDto })
@ApiInternalServerErrorResponse({ type: InternalServerErrorOutputDto })
export class UrlShortUpdateController {
  constructor(private readonly service: UrlShortUpdateService) {}

  @ApiOperation({
    summary: 'Update Url Short',
    description: 'Endpoint to update a Url Short',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  @Patch('/url-short/:id')
  async execute(
    @Param('id') id: string,
    @Body() bodyInput: UrlShortUpdateInputDto,
  ): Promise<void> {
    await this.service.execute({
      id,
      ...bodyInput,
    });
  }
}
