import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column({ length: 512 })
  description: string;

  @Column()
  commentAmount: number;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;
}
