import { UserModel } from '../entities/UserModel';
import { StandardResponse } from '../../common/entities/StandardResponse';

class _SingleUserResponse extends UserModel {
  override password: string;
}

export class SingleUserResponseDto extends StandardResponse<_SingleUserResponse> {}
