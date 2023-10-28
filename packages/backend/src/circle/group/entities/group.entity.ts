import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  groupId: number;

  @Column()
  userId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  User: User;

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
}
