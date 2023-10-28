import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';

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
}
