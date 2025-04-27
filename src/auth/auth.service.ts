import { Injectable, Logger } from '@nestjs/common';
import { SignInWithEmailAndPasswordRequest } from './dto/SignInWithEmailAndPasswordRequest';
import { UsersService } from '../users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signInWithEmailAndPassword({
    email,
    password,
  }: SignInWithEmailAndPasswordRequest) {
    try {
      const _user = this.usersService.getUser({
        email,
      });
      console.log('_user', _user);
      if (_user.status < 400 && _user.payload?.id) {
        if (_user.payload?.password === password) {
          return this.createUserSession({
            id: _user.payload.id,
          });
        }
      }
      return {
        status: 401,
        message: 'Wrong email/password combination',
      };
    } catch (e) {
      this.logger.error(e);
    }

    return {
      status: 500,
      message: 'Server Error',
    };
  }

  private async createUserSession({
    id,
  }: {
    id: string;
    options?: JwtSignOptions;
  }): Promise<string> {
    return this.jwtService.signAsync(
      { id },
      {
        secret: this.configService.get('APP_SECRET'),
        expiresIn: '1h',
      },
    );
  }
}
