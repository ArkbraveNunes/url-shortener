import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UrlRedirectService } from '@url-short/domain/service';
import {
  InternalServerErrorOutputDto,
  UnauthorizedErrorOutputDto,
} from '@libs/common-dto';
import { Response } from 'express';

@ApiTags('Url Redirect')
@Controller()
@ApiUnauthorizedResponse({ type: UnauthorizedErrorOutputDto })
@ApiInternalServerErrorResponse({ type: InternalServerErrorOutputDto })
export class UrlRedirectController {
  constructor(private readonly service: UrlRedirectService) {}

  @ApiOperation({
    summary: 'Get Url Short Data',
    description: 'Endpoint to get Url Short data',
  })
  @HttpCode(HttpStatus.FOUND)
  @Get('/url/:shortIdentifier')
  async execute(
    @Param('shortIdentifier') shortIdentifier: string,
    @Res() res: Response,
  ): Promise<void> {
    const { originUrl } = await this.service.execute({
      shortIdentifier,
    });

    return res.redirect(originUrl);
  }
}
