import {
  Controller,
  Post,
  Body,
  Request,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthenticatedGuard } from '../../user/authenticated.guard';

@Controller('community/comment')
@UseGuards(AuthenticatedGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postid')
  create(
    @Request() req,
    @Param('postid') postid: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const userId = req.session.passport.user.userId;
    return this.commentService.create(userId, postid, createCommentDto);
  }
}
