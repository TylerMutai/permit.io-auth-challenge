import { Module } from '@nestjs/common';
import { BasicAuthGuard } from './basic-auth.guard';
import { AuthService } from './auth.service';

@Module({
  providers: [BasicAuthGuard, AuthService],
  exports: [BasicAuthGuard, AuthService],
})
export class AuthModule {}
