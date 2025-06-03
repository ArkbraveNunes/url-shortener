import { CreateRepository, FindRepository } from '@libs/contract';
import { UrlShortEntity } from '@url-short/domain/entity';

export interface UrlShortRepositoryContract
  extends CreateRepository<UrlShortEntity>,
    FindRepository<UrlShortEntity> {
  findByAuthor(authorId: string): Promise<Array<UrlShortEntity>>;
  updateByShortIdentifier(
    shortIdentifier: string,
    updateData: Partial<Pick<UrlShortEntity, 'numberOfHits'>>,
  ): Promise<void>;
  updateByIdAndAuthor(
    id: string,
    authorId: string,
    updateData: Partial<Pick<UrlShortEntity, 'originUrl'>>,
  ): Promise<void>;
  deleteByIdAndAuthor(id: string, authorId: string): Promise<void>;
}
