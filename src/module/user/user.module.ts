import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  UserCreateController,
  UserFindController,
  UserUpdateController,
} from '@user/application/controller';
import { User } from '@user/infra/entity';
import { REPOSITORY } from '@common/enum';
import { UserRepository } from '@user/infra/repository';
import {
  UserCreateService,
  UserFindService,
  UserUpdateService,
} from '@user/domain/service';
import { ENTITY } from '@common/enum/entity.enum';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserCreateController, UserUpdateController, UserFindController],
  providers: [
    UserCreateService,
    UserUpdateService,
    UserFindService,
    {
      inject: [DataSource],
      provide: ENTITY.USER,
      useFactory: (connection: DataSource) => connection.getRepository(User),
    },
    { provide: REPOSITORY.USER_REPOSITORY, useClass: UserRepository },
  ],
  exports: [
    TypeOrmModule,
    { provide: REPOSITORY.USER_REPOSITORY, useClass: UserRepository },
  ],
})
export class UserModule {}
