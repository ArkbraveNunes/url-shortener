import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UserFindOutputDto } from '@user/application/controller';
import { UserFindService } from '@user/domain/service';
import { Auth } from '@auth/infra/adapter';
import {
  BadRequestErrorOutputDto,
  InternalServerErrorOutputDto,
  UnauthorizedErrorOutputDto,
} from '@libs/common-dto';

@ApiTags('User')
@ApiBearerAuth('token')
@Controller({ version: '1' })
@UseGuards(Auth)
@ApiBadRequestResponse({ type: BadRequestErrorOutputDto })
@ApiUnauthorizedResponse({ type: UnauthorizedErrorOutputDto })
@ApiInternalServerErrorResponse({ type: InternalServerErrorOutputDto })
export class UserFindController {
  constructor(private readonly userFindService: UserFindService) {}

  @ApiOperation({
    summary: 'Get User Data',
    description: 'Endpoint to get User data',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserFindOutputDto })
  @Get('/user/:id')
  async execute(@Param('id') id: string): Promise<UserFindOutputDto> {
    return await this.userFindService
      .execute(id)
      .then((res) => new UserFindOutputDto(res));
  }
}
