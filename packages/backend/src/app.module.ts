import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { UserModule } from './user/user.module';
import { PostModule } from './community/post/post.module';
import { QuestionModule } from './question/question.module';
import { CommentModule } from './community/comment/comment.module';
import { GroupModule } from './circle/group/group.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UserModule,
    PostModule,
    QuestionModule,
    CommentModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
