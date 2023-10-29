import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto) {
    const user = await this.userService.findById(userId);
    console.log(user);

    const post = new Post();
    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.emotion = createPostDto.emotion;
    post.user = user;

    const savedPost = await this.postRepository.save(post);
    return this.findOne(savedPost.postId);
  }

  findById(id: number) {
    return this.postRepository.findOne({ where: { postId: id } });
  }

  findAll() {
    return this.postRepository.find();
  }

  findOne(id: number) {
    return this.postRepository.findOne({
      where: { postId: id },
      relations: ['comments', 'comments.user'],
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.delete(id);
  }

  async paginatePosts(page: number, pageSize: number, timestamp: Date | null) {
    const query = this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.createdAt', 'DESC');

    if (timestamp) {
      query.where('post.createdAt <= :timestamp', { timestamp });
    }

    const [posts, total] = await query
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    return { posts, total };
  }
}
