import { Inject, Injectable } from '@nestjs/common';

import { UrlShort } from '@url-short/infra/entity';
import { UrlShortEntity } from '@url-short/domain/entity';
import { UrlShortRepositoryContract } from '@url-short/domain/contract';
import { Repository } from 'typeorm';
import { ENTITY } from '@common/enum/entity.enum';

@Injectable()
export class UrlShortRepository implements UrlShortRepositoryContract {
  constructor(
    @Inject(ENTITY.URL_SHORT)
    private readonly repository: Repository<UrlShort>,
  ) {}

  async deleteByIdAndAuthor(id: string, authorId: string): Promise<void> {
    await this.repository.softDelete({
      id: id,
      author: { id: authorId },
    });
  }

  async updateByIdAndAuthor(
    id: string,
    authorId: string,
    updateData: Partial<Pick<UrlShortEntity, 'originUrl'>>,
  ): Promise<void> {
    await this.repository.update({ id, author: { id: authorId } }, updateData);
  }

  async findByAuthor(authorId: string): Promise<Array<UrlShortEntity>> {
    const urlShortList = await this.repository.find({
      where: {
        author: { id: authorId },
      },
    });

    return urlShortList.map((urlShort) =>
      UrlShortEntity.fromDbToEntity(urlShort),
    );
  }

  async find(params: Record<string, any>): Promise<UrlShortEntity[]> {
    const urlShortList = await this.repository.find({ where: params });

    return urlShortList.map((urlShort) =>
      UrlShortEntity.fromDbToEntity(urlShort),
    );
  }

  async updateByShortIdentifier(
    shortIdentifier: string,
    updateData: Partial<Pick<UrlShortEntity, 'numberOfHits'>>,
  ): Promise<void> {
    await this.repository.update({ shortIdentifier }, updateData);
  }

  async create(input: UrlShortEntity): Promise<void> {
    const newUrlShort = this.repository.create({
      id: input.id,
      originUrl: input.originUrl,
      shortUrl: input.shortUrl,
      shortIdentifier: input.shortIdentifier,
      numberOfHits: input.numberOfHits,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      deletedAt: input.deletedAt,
      author: input.author,
    });

    await this.repository.save(newUrlShort);
  }

  async findById(id: string): Promise<UrlShortEntity> {
    const docResult = await this.repository.findOneByOrFail({ id: id });

    return UrlShortEntity.fromDbToEntity(docResult);
  }
}
