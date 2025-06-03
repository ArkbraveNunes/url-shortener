import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  UrlShortCreateController,
  UrlShortFindController,
  UrlShortUpdateController,
  UrlRedirectController,
  UrlShortDeleteController,
} from '@url-short/application/controller';
import { UrlShort } from '@url-short/infra/entity';
import { REPOSITORY } from '@common/enum';
import { UrlShortRepository } from '@url-short/infra/repository';
import {
  UrlShortCreateService,
  UrlShortFindService,
  UrlShortUpdateService,
  UrlRedirectService,
  UrlShortDeleteService,
} from '@url-short/domain/service';
import { ENTITY } from '@common/enum/entity.enum';
import { UserModule } from '@user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([UrlShort])],
  controllers: [
    UrlShortCreateController,
    UrlShortUpdateController,
    UrlShortDeleteController,
    UrlShortFindController,
    UrlRedirectController,
  ],
  providers: [
    UrlShortCreateService,
    UrlShortUpdateService,
    UrlShortDeleteService,
    UrlShortFindService,
    UrlRedirectService,
    {
      inject: [DataSource],
      provide: ENTITY.URL_SHORT,
      useFactory: (connection: DataSource) =>
        connection.getRepository(UrlShort),
    },
    { provide: REPOSITORY.URL_SHORT_REPOSITORY, useClass: UrlShortRepository },
  ],
  exports: [
    TypeOrmModule,
    { provide: REPOSITORY.URL_SHORT_REPOSITORY, useClass: UrlShortRepository },
  ],
})
export class UrlShortModule {}
