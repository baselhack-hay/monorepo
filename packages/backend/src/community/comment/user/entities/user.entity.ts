import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '@nestjs/common';
import {Comment} from "../../entities/comment.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(type => Post)
  @JoinTable({
    name: 'USER_POST',
    joinColumn: {
      name: 'userID',
      referencedColumnName: 'userID',
    },
    inverseJoinColumn: {
      name: 'postID',
      referencedColumnName: 'postID',
    },
  })
  Post: Post[];

  @ManyToMany(type => Comment)
  @JoinTable({
    name: 'USER_COMMENT',
    joinColumn: {
      name: 'userID',
      referencedColumnName: 'userID',
    },
    inverseJoinColumn: {
      name: 'commentId',
      referencedColumnName: 'CommentId',
    },
  })
  Comment: Comment[];
}
