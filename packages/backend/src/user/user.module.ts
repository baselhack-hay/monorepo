import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ session: true }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, SessionSerializer],
})
export class UserModule {}
