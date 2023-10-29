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
import { Chat } from '../../circle/chat/entities/chat.entity';

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

  @OneToMany(() => Chat, (chat) => chat.user)
  chats: Chat[];

  @ManyToMany(() => Group)
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
