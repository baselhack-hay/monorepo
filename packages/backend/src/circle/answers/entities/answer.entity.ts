import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../../user/entities/user.entity';
@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  answerId: number;

  @Column({ length: 512 })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: number;

  @OneToOne((type) => User)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  User: User;
}
