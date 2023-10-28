import {
  Controller,
  // Get,
  Post,
  Body,
  Get,
  Delete,
  Param,
  // Patch,
  // Param,
  // Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/signup')
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
  login(@Request() req): any {
    return { msg: `User ${req.user.username} successfully signed in` };
  }

  @Get('/test')
  async test() {
    return this.userService.getUser('demouser3');
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
