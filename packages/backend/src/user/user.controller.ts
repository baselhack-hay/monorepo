import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './local.auth.guard';
import { AuthenticatedGuard } from './authenticated.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

/**
 * Get Current user from session with
 * req.session.passport.user.userId;
 */

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @ApiBody({
    type: CreateUserDto,
  })
  async signUp(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    console.log(hashedPassword);
    createUserDto.password = hashedPassword;
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({
    type: CreateUserDto,
  })
  login(@Request() req): any {
    return { msg: `User ${req.user.username} successfully signed in!` };
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/current')
  getCurrentUserFromSession(@Request() req) {
    const userId = req.session.passport.user.userId;
    return userId;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'User successfully logged out' };
  }
}
