import { Injectable, Logger } from '@nestjs/common';
import { SignInWithEmailAndPasswordRequest } from './dto/SignInWithEmailAndPasswordRequest';
import { UsersService } from '../users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInWithEmailAndPasswordResponse } from './dto/SignInWithEmailAndPasswordResponse';

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
  }: SignInWithEmailAndPasswordRequest): Promise<SignInWithEmailAndPasswordResponse> {
    try {
      const _user = this.usersService.getUser({
        email,
      });
      console.log('_user', _user);
      if (_user.status < 400 && _user.payload?.id) {
        if (_user.payload?.password === password) {
          const token = await this.createUserSession({
            id: _user.payload.id,
          });

          return {
            status: 200,
            message: 'Success',
            token,
            user: _user,
          };
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

  async verifyJWTToken(token: string) {
    try {
      return await this.jwtService.verifyAsync<{ sub: string }>(token, {
        secret: this.configService.get('APP_SECRET'),
      });
    } catch (e) {
      this.logger.error(e);
    }
    return undefined;
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
