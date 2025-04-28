import { Reflector } from '@nestjs/core';

export interface PermissionMetadata {
  resource: string;
  action: string;
}

export const PermissionDecorator =
  Reflector.createDecorator<PermissionMetadata>();
