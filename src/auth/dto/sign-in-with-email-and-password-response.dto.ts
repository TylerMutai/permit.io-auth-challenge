import { StandardResponse } from '../../common/entities/StandardResponse';
import { SingleUserResponseDto } from '../../users/dto/single-user-response.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInWithEmailAndPasswordResponseDto extends StandardResponse<SignInWithEmailAndPasswordResponseDto> {
  @IsString()
  token?: string;

  @IsNotEmpty()
  user?: SingleUserResponseDto;
}
