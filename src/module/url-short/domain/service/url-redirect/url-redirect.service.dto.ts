import { UrlShortEntity } from '@url-short/domain/entity';

export type UrlRedirectServiceInputDto = Pick<
  UrlShortEntity,
  'shortIdentifier'
>;

export type UrlRedirectServiceOutputDto = UrlShortEntity;
