import { Emotion } from '../entities/post.entity';

export class CreatePostDto {
  title: string;
  description: string;
  emotion: Emotion;
  userId: number;
}
