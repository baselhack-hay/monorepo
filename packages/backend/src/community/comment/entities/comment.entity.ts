import {
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from "../user/entities/user.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  commentId: number;

  @Column({ length: 512 })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(type => User)
  @JoinTable({
    name: 'USER_COMMENT',
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
