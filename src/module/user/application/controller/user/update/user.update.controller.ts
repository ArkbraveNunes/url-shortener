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
  UserUpdateBadRequestOutputDto,
  UserUpdateInputDto,
} from '@user/application/controller';
import { UserUpdateService } from '@user/domain/service';
import { Auth } from '@auth/infra/adapter';
import {
  InternalServerErrorOutputDto,
  UnauthorizedErrorOutputDto,
} from '@libs/common-dto';

@ApiTags('User')
@ApiBearerAuth('token')
@Controller({ version: '1' })
@UseGuards(Auth)
@ApiBadRequestResponse({ type: UserUpdateBadRequestOutputDto })
@ApiUnauthorizedResponse({ type: UnauthorizedErrorOutputDto })
@ApiInternalServerErrorResponse({ type: InternalServerErrorOutputDto })
export class UserUpdateController {
  constructor(private readonly updateUserService: UserUpdateService) {}

  @ApiOperation({
    summary: 'Update User',
    description: 'Endpoint to update a User',
  })
  @HttpCode(HttpStatus.OK)
  @Patch('/user/:id')
  async execute(
    @Param('id') id: string,
    @Body() updateUserInputDto: UserUpdateInputDto,
  ): Promise<void> {
    await this.updateUserService.execute({
      id,
      ...updateUserInputDto,
    });
  }
}
