import { Global, Module } from '@nestjs/common';
import { NanoidService } from './nanoid.service';

@Global()
@Module({
  providers: [NanoidService],
  exports: [NanoidService],
})
export class NanoidModule {}
