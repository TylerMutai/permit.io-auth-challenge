import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermitService } from './permit.service';

const PERMISSION_METADATA_KEY = 'permission';

export interface PermissionMetadata {
  resource: string;
  action: string;
  resourceIdParam?: string;
}

export function Permission(
  resource: string,
  action: string,
  resourceIdParam: string = 'id',
) {
  return Reflect.metadata(PERMISSION_METADATA_KEY, {
    resource,
    action,
    resourceIdParam,
  });
}

@Injectable()
export class PermitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permitService: PermitService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission: PermissionMetadata = this.reflector.get(
      PERMISSION_METADATA_KEY,
      context.getHandler(),
    );
    if (!permission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userId = (request as any).user?.userId;
    if (!userId) {
      throw new ForbiddenException('User not found in request');
    }
    const resourceId =
      (request.params || {})[permission.resourceIdParam || 'id'];
    const allowed = await this.permitService.checkPermission(
      userId,
      permission.resource,
      permission.action,
      resourceId,
    );
    if (!allowed) {
      throw new ForbiddenException('Forbidden');
    }
    return true;
  }
}