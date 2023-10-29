import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.save(createQuestionDto);
  }

  findAll() {
    return this.questionRepository.find();
  }

  findOne(id: number) {
    return this.questionRepository.findOneBy({ questionId: id });
  }

  findDaily() {
    return this.questionRepository.findOneBy({ questionId: 1 });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const currentQuestion = await this.findOne(id);

    const newQuestion = new Question();
    newQuestion.questionId = currentQuestion.questionId;
    newQuestion.title = updateQuestionDto.title ?? currentQuestion.title;
    newQuestion.description =
      updateQuestionDto.description ?? currentQuestion.description;

    return this.questionRepository.save(newQuestion);
  }

  remove(id: number) {
    return this.questionRepository.delete(id);
  }
}
