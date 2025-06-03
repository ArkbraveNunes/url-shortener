import { IsDefined, IsEmail, IsString } from 'class-validator';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { ApiProperty } from '@nestjs/swagger';

import { USER_MESSAGES_ERRORS } from '@common/enum';
import {
  BadRequestErrorOutputDto,
  ConflictErrorOutputDto,
} from '@libs/common-dto';
import { PasswordValidator } from '@libs/validator';
import { UserCreateServiceOutputDto } from '@user/domain/service';

export class UserCreateInputDto {
  @ApiProperty({ example: faker.person.fullName() })
  @IsDefined({ message: USER_MESSAGES_ERRORS.NAME_IS_REQUIRED })
  @IsString({ message: USER_MESSAGES_ERRORS.NAME_IS_INVALID })
  name: string;

  @ApiProperty({ example: faker.internet.email() })
  @IsDefined({ message: USER_MESSAGES_ERRORS.EMAIL_IS_REQUIRED })
  @IsEmail(undefined, { message: USER_MESSAGES_ERRORS.EMAIL_IS_INVALID })
  email: string;

  @ApiProperty({ example: faker.internet.password() })
  @IsDefined({ message: USER_MESSAGES_ERRORS.PASSWORD_IS_REQUIRED })
  @PasswordValidator({
    message: USER_MESSAGES_ERRORS.PASSWORD_IS_INVALID,
  })
  password: string;
}

export class UserCreateOutputDto {
  @ApiProperty({ example: faker.string.uuid() })
  @IsString()
  id: string;

  constructor(userCreateServiceOutput: UserCreateServiceOutputDto) {
    Object.assign(this, userCreateServiceOutput);
  }
}

export class UserCreateBadRequestOutputDto extends BadRequestErrorOutputDto {
  @ApiProperty({
    example: [
      USER_MESSAGES_ERRORS.NAME_IS_REQUIRED,
      USER_MESSAGES_ERRORS.NAME_IS_INVALID,
      USER_MESSAGES_ERRORS.EMAIL_IS_REQUIRED,
      USER_MESSAGES_ERRORS.EMAIL_IS_INVALID,
      USER_MESSAGES_ERRORS.EMAIL_IS_INVALID_OR_NOT_EXIST,
      USER_MESSAGES_ERRORS.PASSWORD_IS_REQUIRED,
      USER_MESSAGES_ERRORS.PASSWORD_IS_INVALID,
    ],
  })
  declare message: USER_MESSAGES_ERRORS[];
}

export class UserCreateConflictOutputDto extends ConflictErrorOutputDto {
  @ApiProperty({
    example: [USER_MESSAGES_ERRORS.USER_CONFLICT],
  })
  declare message: USER_MESSAGES_ERRORS[];
}
