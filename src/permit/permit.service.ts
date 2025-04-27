import { Injectable, OnModuleInit } from '@nestjs/common';
import { Permit } from '@permit.io/permit-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PermitService implements OnModuleInit {
  private permit: Permit;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>('PERMIT_API_KEY');
    const host = this.configService.get<string>('PERMIT_HOST');
    this.permit = new Permit({
      apiKey,
      host,
    });
  }

  async checkPermission(
    userId: string,
    resourceType: string,
    action: string,
    resourceId?: string,
  ): Promise<boolean> {
    const principal = { id: userId };
    const resource = {
      object: { type: resourceType, id: resourceId ?? '*' },
      action,
    };
    return this.permit.check({ principal, resource });
  }
}