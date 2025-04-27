import { StandardResponse } from '../../common/entities/StandardResponse';
import { SingleUserResponse } from '../../users/dto/SingleUserResponse';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInWithEmailAndPasswordResponse extends StandardResponse<SignInWithEmailAndPasswordResponse> {
  @IsString()
  token?: string;

  @IsNotEmpty()
  user?: SingleUserResponse;
}
