import { Module } from '@nestjs/common';
import { PermitService } from './permit.service';
import { PermitGuard } from './permit.guard';
import { Reflector } from '@nestjs/core';

@Module({
  providers: [PermitService, PermitGuard, Reflector],
  exports: [PermitService],
})
export class PermitModule {}