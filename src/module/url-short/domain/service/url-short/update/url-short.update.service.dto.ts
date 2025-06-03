import { UrlShortEntity } from '@url-short/domain/entity';

export type UrlShortUpdateServiceInputDto = Pick<
  UrlShortEntity,
  'id' | 'originUrl'
>;
