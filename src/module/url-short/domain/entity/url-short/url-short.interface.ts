import { IUser } from '@user/domain/entity';

export interface IUrlShort {
  originUrl: string;
  shortUrl: string;
  shortIdentifier: string;
  numberOfHits: number;
  author?: IUser;
}
