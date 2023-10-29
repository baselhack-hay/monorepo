import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';
import { Chat } from '../chat/entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, Chat])],
  controllers: [GroupController],
  providers: [GroupService, UserService],
})
export class GroupModule {}
