import { v4 as uuidv4 } from 'uuid';

import { Entity } from '@libs/contract';
import { IUrlShort } from './url-short.interface';
import { IUser } from '@user/domain/entity';

export type UrlShortProps = IUrlShort &
  Pick<UrlShortEntity, 'id' | 'updatedAt' | 'createdAt' | 'deletedAt'>;

export type CreateUrlShortProps = Omit<IUrlShort, 'numberOfHits'>;

export type DbUrlShortProps = Pick<
  UrlShortEntity,
  'id' | 'originUrl' | 'shortUrl' | 'shortIdentifier' | 'numberOfHits'
> & {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export class UrlShortEntity extends Entity implements IUrlShort {
  originUrl: string;
  shortUrl: string;
  shortIdentifier: string;
  numberOfHits: number;
  updatedAt: string;
  deletedAt?: string;
  author?: IUser;

  constructor(props: UrlShortProps) {
    super(props);
    Object.assign(this, props);
  }
  static create(props: CreateUrlShortProps): UrlShortEntity {
    const id = uuidv4();
    const numberOfHits = 0;
    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();
    const deletedAt = undefined;
    return new UrlShortEntity({
      ...props,
      id,
      numberOfHits,
      createdAt,
      updatedAt,
      deletedAt,
    });
  }

  static fromDbToEntity(props: DbUrlShortProps): UrlShortEntity {
    return new UrlShortEntity({
      ...props,
      createdAt: new Date(props.createdAt).toISOString(),
      updatedAt: new Date(props.updatedAt).toISOString(),
      deletedAt: props.deletedAt
        ? new Date(props.deletedAt).toISOString()
        : undefined,
    });
  }
}
