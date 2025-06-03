import { IUrlShort } from '@url-short/domain/entity';
import { User } from '@user/infra/entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class UrlShort implements IUrlShort {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originUrl: string;

  @Column()
  shortUrl: string;

  @Column({ unique: true })
  shortIdentifier: string;

  @Column()
  numberOfHits: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'author_id' })
  author?: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | null;
}
