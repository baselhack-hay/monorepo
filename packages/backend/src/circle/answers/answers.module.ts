import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, User])],
  controllers: [AnswersController],
  providers: [AnswersService, UserService],
})
export class AnswersModule {}
