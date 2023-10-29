import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';
import { Chat } from '../../chat/entities/chat.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  groupId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'GROUP_USER',
    joinColumn: {
      name: 'group',
      referencedColumnName: 'groupId',
    },
    inverseJoinColumn: {
      name: 'user',
      referencedColumnName: 'userId',
    },
  })
  users: User[];

  @OneToMany(() => Chat, (chat) => chat.group)
  chats: Chat[];
}
