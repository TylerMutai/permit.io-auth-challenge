import { StandardRequest } from '../../common/entities/StandardRequest';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInWithEmailAndPasswordRequestDto extends StandardRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
