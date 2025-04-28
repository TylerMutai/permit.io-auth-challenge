import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from './permissions.service';
import {
  PermissionDecorator,
  PermissionMetadata,
} from './permissions.decorator';
import { UserModel } from '../users/entities/UserModel';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permitService: PermissionsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permission: PermissionMetadata = this.reflector.get(
      PermissionDecorator,
      context.getHandler(),
    );
    if (!permission) {
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    const user: UserModel = context.switchToHttp().getRequest()?.['user'];

    if (!user?.id) {
      throw new ForbiddenException('User not found in request');
    }

    const allowed = await this.permitService.checkPermission({
      user: {
        key: user.id,
      },
      resource: permission.resource,
      action: permission.action,
    });
    if (!allowed) {
      throw new ForbiddenException('Forbidden');
    }
    return true;
  }
}
