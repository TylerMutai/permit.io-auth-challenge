import { forwardRef, Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsGuard } from './permissions.guard';
import { Reflector } from '@nestjs/core';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [PermissionsService, PermissionsGuard, Reflector],
  exports: [PermissionsService],
})
export class PermissionsModule {}
