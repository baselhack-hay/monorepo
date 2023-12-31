import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { userId: id } });
  }

  async getUser(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    console.log('user: ', user);
    return user;
  }

  async validateUser(username: string, password: string) {
    const user = await this.getUser(username);
    console.log('uswer server found this user, ', user);
    if (!user) {
      throw new NotAcceptableException('user could not be found!');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (isPasswordValid) {
      return user;
    }

    return null;
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
