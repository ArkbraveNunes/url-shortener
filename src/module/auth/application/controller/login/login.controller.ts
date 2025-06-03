import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

import { InternalServerErrorOutputDto } from '@libs/common-dto';
import { LoginService } from '@auth/domain/service';
import {
  LoginBadRequestOutputDto,
  LoginInputDto,
  LoginOutputDto,
  LoginUnauthorizedOutputDto,
} from './login.dto';

@Controller({
  path: 'auth',
  version: '1',
})
@ApiTags('Auth')
@ApiBadRequestResponse({
  type: LoginBadRequestOutputDto,
})
@ApiUnauthorizedResponse({
  type: LoginUnauthorizedOutputDto,
})
@ApiInternalServerErrorResponse({
  type: InternalServerErrorOutputDto,
})
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({
    summary: 'Login by email and password',
    description: 'Endpoint to login by email and password',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginOutputDto,
  })
  @Post('/login')
  async login(
    @Body() loginControllerInputDto: LoginInputDto,
  ): Promise<LoginOutputDto> {
    return await this.loginService
      .execute(loginControllerInputDto)
      .then((res) => new LoginOutputDto(res));
  }
}
