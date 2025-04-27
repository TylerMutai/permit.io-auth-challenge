import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { RESTUserDecorator } from './user.decorator';

@Module({
  providers: [UsersService],
  exports: [UsersService, RESTUserDecorator],
})
export class UsersModule {}
