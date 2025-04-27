import { Module } from '@nestjs/common';
import { BasicAuthGuard } from './basic-auth.guard';
import { UsersService } from './users.service';

@Module({
  providers: [BasicAuthGuard, UsersService],
  exports: [BasicAuthGuard, UsersService],
})
export class AuthModule {}