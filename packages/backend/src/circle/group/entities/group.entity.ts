import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  groupId: number;

  /*@ManyToOne(type => Category)
@JoinColumn([
    { name: "category_id", referencedColumnName: "id" },
    { name: "locale_id", referencedColumnName: "locale_id" }
])
category: Category;*/

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToMany((type) => User)
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
  user: User[];
}
