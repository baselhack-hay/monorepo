import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '@nestjs/common';

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
}
