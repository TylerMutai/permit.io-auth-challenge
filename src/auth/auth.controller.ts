import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInWithEmailAndPasswordRequest } from './dto/SignInWithEmailAndPasswordRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('sign-in-with-email-password')
  async signInWithEmailAndPassword(
    @Body() args: SignInWithEmailAndPasswordRequest,
  ) {
    return this._authService.signInWithEmailAndPassword(args);
  }
}
