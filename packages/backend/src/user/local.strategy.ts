import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from './user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('validate user', username, password);
    const user = this.userService.validateUser(username, password);
    console.log('found user');

    if (!user) {
      throw UnauthorizedException;
    }

    return user;
  }
}
