import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.authService.verifyJWTToken(token);
      if (payload?.sub) {
        request['userId'] = payload?.sub;
        const _user = this.usersService.findOne({
          id: payload?.sub,
        });
        if (_user?.payload) {
          request['user'] = _user.payload;
        }
        return true;
      }
    } catch {
      // left blank.
    }
    throw new UnauthorizedException();
  }

  private extractTokenFromHeader = (request: Request) => {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  };
}
