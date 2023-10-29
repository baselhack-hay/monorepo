import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../../group/entities/group.entity';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  chatId: number;

  @Column()
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Group, (group) => group.chats)
  group: Group;

  @ManyToOne(() => User, (user) => user.chats)
  user: User;
}
