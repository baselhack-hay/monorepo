import { CreateDateColumn, UpdateDateColumn, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column({ length: 500 })
  title: string;

  @Column({ length: 512 })
  description: string;

  @Column()
  commentAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
