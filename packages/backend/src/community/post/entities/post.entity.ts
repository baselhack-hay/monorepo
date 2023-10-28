import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';

export enum Emotion {
  SUPRISED = 'surprised',
  HAPPY = 'happy',
  SCARED = 'scared',
  SAD = 'sad',
  ANGRY = 'angry',
  REJECTING = 'rejecting',
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  postId: number;

  @Column({ length: 500 })
  title: string;

  @Column({ length: 512 })
  description: string;

  // @Column()
  // commentAmount: number;

  @Column({
    type: 'enum',
    enum: Emotion,
    default: Emotion.HAPPY,
  })
  emotion: Emotion;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany((type) => User)
  @JoinTable({
    name: 'USER_POST',
    joinColumn: {
      name: 'postId',
      referencedColumnName: 'postId',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'userId',
    },
  })
  User: User[];
}
