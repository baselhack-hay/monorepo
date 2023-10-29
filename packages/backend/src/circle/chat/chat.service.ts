import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';
import { GroupService } from '../group/group.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    private readonly userService: UserService,
    private readonly groupService: GroupService,
  ) {}

  async create(groupId: number, userId: number, createChatDto: CreateChatDto) {
    const user = await this.userService.findById(userId);
    const group = await this.groupService.findById(groupId);

    const chat = new Chat();
    chat.message = createChatDto.message;
    chat.user = user;
    chat.group = group;
    const savedChat = await this.chatRepository.save(chat);
    return this.findOne(savedChat.chatId);
  }

  async findAll(groupId: number) {
    const group = await this.groupService.findById(groupId);
    return this.chatRepository.find({
      where: { group: group },
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return this.chatRepository.findOne({
      where: { chatId: id },
    });
  }
}
