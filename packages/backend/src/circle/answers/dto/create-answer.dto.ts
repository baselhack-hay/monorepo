import { Emotion } from '../entities/answer.entity';

export class CreateAnswerDto {
  answer: string;
  userId: number;
  emotion: Emotion;
}
