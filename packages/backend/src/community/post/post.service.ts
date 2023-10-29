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
      .select([
        'post.postId',
        'post.title',
        'post.description',
        'post.emotion',
        'post.createdAt',
        'post.updatedAt',
      ])
      .orderBy('post.createdAt', 'DESC');

    if (timestamp) {
      query.where('post.createdAt <= :timestamp', { timestamp });
    }

    const [posts, total] = await query
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    // Get the comment count for each post
    const postIds = posts.map((post) => post.postId);
    const commentCounts = await this.postRepository
      .createQueryBuilder('post')
      .select('post.postId', 'postId')
      .addSelect('COUNT(comment.commentId)', 'commentCount')
      .leftJoin('post.comments', 'comment')
      .groupBy('post.postId')
      .whereInIds(postIds)
      .getRawMany();

    // Create a map with the countent comments
    const commentCountMap = new Map(
      commentCounts.map((item) => [item.postId, item.commentCount]),
    );

    // Combine the posts with their comment counts
    const formattedPosts = posts.map((post) => ({
      ...post,
      commentCount: commentCountMap.get(post.postId) || 0,
    }));

    return { posts: formattedPosts, total };
  }
}
