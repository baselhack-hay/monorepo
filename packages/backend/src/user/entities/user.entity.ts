import { Post } from '../../community/post/entities/post.entity';
import { Comment } from '../../community/comment/entities/comment.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from '../../circle/group/entities/group.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];



  @ManyToMany((type) => Group)
  @JoinTable({
    name: 'GROUP_USER',
    joinColumn: {
      name: 'user',
      referencedColumnName: 'userId',
    },
    inverseJoinColumn: {
      name: 'group',
      referencedColumnName: 'groupId',
    },
  })
  user: User[];
}
