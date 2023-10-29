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
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('post')
@ApiTags('Post')
@UseGuards(AuthenticatedGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiBody({
    type: CreatePostDto,
  })
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    const userId = req.session.passport.user.userId;
    console.log('add post for user: ', req);
    return this.postService.create(userId, createPostDto);
  }

  /**
   * 
   * Get the current date and time
const currentDate = new Date();

// Subtract one hour from the current date and time
currentDate.setHours(currentDate.getHours() - 1);

// Convert the modified date to ISO 8601 format
const isoString = currentDate.toISOString();

console.log(isoString);
   * @param pageSize 
   * @param timestamp 
   * @returns 
   */
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
