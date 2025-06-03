import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { InternalServerErrorOutputDto } from '@libs/common-dto';

import { LoginRefreshService } from '@auth/domain/service';
import {
  LoginRefreshBadRequestOutputDto,
  LoginRefreshInputDto,
  LoginRefreshOutputDto,
  LoginRefreshUnauthorizedOutputDto,
} from './login-refresh.dto';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiTags('Auth')
@ApiBadRequestResponse({
  type: LoginRefreshBadRequestOutputDto,
})
@ApiUnauthorizedResponse({
  type: LoginRefreshUnauthorizedOutputDto,
})
@ApiInternalServerErrorResponse({
  type: InternalServerErrorOutputDto,
})
export class LoginRefreshController {
  constructor(private readonly loginRefreshService: LoginRefreshService) {}

  @ApiOperation({
    summary: 'Refresh login by Refresh Token',
    description: 'Endpoint to login by Refresh Token',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginRefreshOutputDto,
  })
  @Post('/login/refresh')
  async loginRefresh(
    @Body() loginRefreshInputDto: LoginRefreshInputDto,
  ): Promise<LoginRefreshOutputDto> {
    return await this.loginRefreshService
      .execute(loginRefreshInputDto)
      .then((res) => new LoginRefreshOutputDto(res));
  }
}
