import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsGuard } from './permissions.guard';
import { Reflector } from '@nestjs/core';
import { PermissionDecorator } from './permissions.decorator';

@Module({
  providers: [PermissionsService, PermissionsGuard, Reflector],
  exports: [PermissionsService, PermissionDecorator],
})
export class PermissionsModule {}
