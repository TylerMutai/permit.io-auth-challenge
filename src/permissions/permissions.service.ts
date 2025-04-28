import { Injectable, OnModuleInit } from '@nestjs/common';
import { IUser, Permit } from 'permitio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PermissionsService implements OnModuleInit {
  private permit: Permit;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const token = this.configService.get<string>('PERMIT_IO_TOKEN');
    const pdp = this.configService.get<string>('PERMIT_IO_URL');
    this.permit = new Permit({
      pdp,
      token,
    });
  }

  async checkPermission({
    user,
    action,
    resource,
  }: {
    user: string | IUser;
    action: string;
    resource: string;
  }): Promise<boolean> {
    return this.permit.check(user, action, resource);
  }
}
