import { Module } from '@nestjs/common';

import { HealthCheckModule } from '@libs/healthcheck';
import { CommonModule } from '@common/common.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { UrlShortModule } from '@url-short/url-short.module';

@Module({
  imports: [
    HealthCheckModule,
    CommonModule,
    UserModule,
    AuthModule,
    UrlShortModule,
  ],
})
export class AppModule {}
