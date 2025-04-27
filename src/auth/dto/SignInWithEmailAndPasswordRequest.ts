import { StandardRequest } from '../../common/entities/StandardRequest';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInWithEmailAndPasswordRequest extends StandardRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
