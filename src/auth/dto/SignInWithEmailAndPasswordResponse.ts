import { StandardResponse } from '../../common/entities/StandardResponse';
import { SingleUserResponse } from '../../users/dto/SingleUserResponse';
import { IsNotEmpty } from 'class-validator';

export class SignInWithEmailAndPasswordResponse extends StandardResponse<SignInWithEmailAndPasswordResponse> {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  user: SingleUserResponse;
}
