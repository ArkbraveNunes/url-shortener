import { UrlShortEntity } from '@url-short/domain/entity';

export type UrlShortCreateServiceInputDto = {
  url: string;
};

export type UrlShortCreateServiceOutputDto = UrlShortEntity;
