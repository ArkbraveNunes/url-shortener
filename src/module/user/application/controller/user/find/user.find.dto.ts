import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { UserFindServiceOutputDto } from '@user/domain/service';

export class UserFindOutputDto {
  @ApiProperty({ example: faker.string.uuid() })
  @IsString()
  id: string;

  @ApiProperty({ example: faker.person.fullName() })
  name: string;

  @ApiProperty({ example: faker.internet.email() })
  email: string;

  constructor(user: UserFindServiceOutputDto) {
    Object.assign(this, user);
  }
}
