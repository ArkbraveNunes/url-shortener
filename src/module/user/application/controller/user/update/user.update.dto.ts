import { IsDefined, IsEmail, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { BadRequestErrorOutputDto } from '@libs/common-dto';
import { USER_MESSAGES_ERRORS } from '@common/enum';

export class UserUpdateInputDto {
  @ApiProperty({ example: faker.person.fullName() })
  @ValidateIf((body: UserUpdateInputDto) => !!body.name)
  @IsDefined({ message: USER_MESSAGES_ERRORS.NAME_IS_REQUIRED })
  @IsString({ message: USER_MESSAGES_ERRORS.NAME_IS_INVALID })
  name?: string;

  @ApiProperty({ example: faker.internet.email() })
  @ValidateIf((body: UserUpdateInputDto) => !!body.email)
  @IsDefined({ message: USER_MESSAGES_ERRORS.EMAIL_IS_REQUIRED })
  @IsEmail(undefined, { message: USER_MESSAGES_ERRORS.EMAIL_IS_INVALID })
  email?: string;
}

export class UserUpdateBadRequestOutputDto extends BadRequestErrorOutputDto {
  @ApiProperty({
    example: [
      USER_MESSAGES_ERRORS.NAME_IS_INVALID,
      USER_MESSAGES_ERRORS.EMAIL_IS_INVALID,
    ],
  })
  declare message: USER_MESSAGES_ERRORS[];
}
