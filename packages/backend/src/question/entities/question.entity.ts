import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

Entity();
export class Question {
  @PrimaryGeneratedColumn()
  questionId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  commentsAmount: number;

  @Column()
  createdAt: number;
}
