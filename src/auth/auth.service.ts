import { Injectable, Logger } from '@nestjs/common';
import { SignInWithEmailAndPasswordRequestDto } from './dto/sign-in-with-email-and-password-request.dto';
import { UsersService } from '../users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInWithEmailAndPasswordResponseDto } from './dto/sign-in-with-email-and-password-response.dto';
import { SingleUserResponseWithPasswordDto } from '../users/dto/single-user-response.dto';

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
  }: SignInWithEmailAndPasswordRequestDto): Promise<SignInWithEmailAndPasswordResponseDto> {
    try {
      const _user = this.usersService.findOne({
        email,
      }) as SingleUserResponseWithPasswordDto;
      console.log('_user', _user, '\n');
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
      throw e;
    }
  }

  async verifyJWTToken(token: string) {
    try {
      return await this.jwtService.verifyAsync<{ id: string }>(token, {
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
