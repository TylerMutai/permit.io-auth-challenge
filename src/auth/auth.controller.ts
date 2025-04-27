import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInWithEmailAndPasswordRequestDto } from './dto/sign-in-with-email-and-password-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('sign-in-with-email-password')
  async signInWithEmailAndPassword(
    @Body() args: SignInWithEmailAndPasswordRequestDto,
  ) {
    return this._authService.signInWithEmailAndPassword(args);
  }
}
