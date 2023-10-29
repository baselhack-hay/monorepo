import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthenticatedGuard } from '../../user/authenticated.guard';

@Controller('post')
@UseGuards(AuthenticatedGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const userId = req.session.passport.user.userId;
    console.log('add post for user: ', req);
    return this.postService.create(userId, createPostDto);
  }

  @Get('paginate')
  async paginatePosts(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('timestamp') timestamp: string,
  ) {
    const date = timestamp ? new Date(timestamp) : null;
    const result = await this.postService.paginatePosts(page, pageSize, date);

    return result;
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
