import { Post } from '../../community/post/entities/post.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Post)
  @JoinTable({
    name: 'USER_POST',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'userId',
    },
    inverseJoinColumn: {
      name: 'postId',
      referencedColumnName: 'postId',
    },
  })
  post: Post[];
}
