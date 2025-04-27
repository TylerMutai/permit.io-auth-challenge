import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException('Missing Basic Authentication header');
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(
      base64Credentials,
      'base64',
    ).toString('ascii');
    const [userId, password] = credentials.split(':');
    const user = this.usersService.validateUser(userId, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    (request as any).user = { userId: user.userId };
    return true;
  }
}