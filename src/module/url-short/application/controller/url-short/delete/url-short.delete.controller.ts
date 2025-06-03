import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UrlShortDeleteService } from '@url-short/domain/service';
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
export class UrlShortDeleteController {
  constructor(private readonly service: UrlShortDeleteService) {}

  @ApiOperation({
    summary: 'Delete Url Short',
    description: 'Endpoint to delete a Url Short',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/url-short/:id')
  async execute(@Param('id') id: string): Promise<void> {
    await this.service.execute({
      id,
    });
  }
}
