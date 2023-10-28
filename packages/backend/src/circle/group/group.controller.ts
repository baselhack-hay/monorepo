import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('/circle/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Request() req, @Body() createGroupDto: CreateGroupDto) {
    const userId = req.session.passport.user.userId;
    return this.groupService.create(userId, createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Get('/user/:id')
  findAllByUserId(@Param('id') id: string) {
    return this.groupService.findAllByUserId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
