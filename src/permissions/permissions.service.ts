import { Injectable, OnModuleInit } from '@nestjs/common';
import { Permit } from 'permitio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PermissionsService implements OnModuleInit {
  private permit: Permit;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const token = this.configService.get<string>('PERMIT_IO_TOKEN');
    const apiUrl = this.configService.get<string>('PERMIT_IO_URL');
    this.permit = new Permit({
      apiUrl,
      token,
    });
  }

  async checkPermission({
    userId,
    action,
    resource,
  }: {
    userId: string;
    action: string;
    resource: string;
  }): Promise<boolean> {
    return this.permit.check(userId, action, resource);
  }
}
