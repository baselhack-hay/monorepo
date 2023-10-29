import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('/circle/chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(':groupid')
  @ApiBody({
    type: CreateChatDto,
  })
  create(
    @Request() req,
    @Param('groupid') groupid: number,
    @Body() createChatDto: CreateChatDto,
  ) {
    const userId = req.session.passport.user.userId;
    return this.chatService.create(groupid, userId, createChatDto);
  }

  @Get(':groupid')
  findAll(@Param('groupid') groupid: number) {
    return this.chatService.findAll(groupid);
  }
}
