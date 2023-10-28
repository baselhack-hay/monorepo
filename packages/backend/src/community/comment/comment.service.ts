import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { PostService } from '../post/post.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  async create(
    userId: number,
    postId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const user = await this.userService.findById(userId);
    const post = await this.postService.findById(postId);

    const comment = new Comment();
    comment.content = createCommentDto.content;
    comment.user = user;
    comment.post = post;
    const savedComment = await this.commentRepository.save(comment);
    return this.findOne(savedComment.commentId);
  }

  findOne(id: number) {
    return this.commentRepository.findOne({
      where: {
        commentId: id,
      },
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update(id, updateCommentDto);
  }

  remove(id: number) {
    return this.commentRepository.delete(id);
  }
}
