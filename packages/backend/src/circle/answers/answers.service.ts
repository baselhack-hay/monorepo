import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly userService: UserService,
  ) {}

  async create(createAnswerDto: CreateAnswerDto) {
    const user = await this.userService.findById(createAnswerDto.userId);

    const answer = new Answer();
    answer.answer = createAnswerDto.answer;
    answer.user = user;

    return this.answerRepository.save(answer);
  }

  findAll() {
    return this.answerRepository.find();
  }

  findOne(id: number) {
    return this.answerRepository.findOneBy({ answerId: id });
  }

  async findDailyQuestionByUserId(userId: number) {
    const questions = await this.answerRepository.findBy({ userId: userId });
    const today = new Date().getUTCDate();

    const dailyQuestion = questions.find((question) => {
      const day = new Date(question.createdAt).getUTCDate();
      return day >= today;
    });

    return dailyQuestion;
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    const currentAnswer = await this.findOne(id);

    const updatedAnswer = new Answer();
    updatedAnswer.answerId = currentAnswer.answerId;
    updatedAnswer.answer = updateAnswerDto.answer ?? currentAnswer.answer;
    updatedAnswer.userId = currentAnswer.userId;
    updatedAnswer.user = currentAnswer.user;

    return this.answerRepository.save(updatedAnswer);
  }

  remove(id: number) {
    return this.answerRepository.delete(id);
  }
}
