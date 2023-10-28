import { Controller, Post, Body, Request, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('community/comment')
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
