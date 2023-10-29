import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UserService } from '../../user/user.service';
import { Chat } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Group } from '../group/entities/group.entity';
import { GroupService } from '../group/group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, User, Group])],
  controllers: [ChatController],
  providers: [ChatService, UserService, GroupService],
})
export class ChatModule {}
