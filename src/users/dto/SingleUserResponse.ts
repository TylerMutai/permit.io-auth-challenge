import { UserModel } from '../entities/UserModel';
import { StandardResponse } from '../../common/entities/StandardResponse';

class _SingleUserResponse extends UserModel {
  override password: string;
}

export class SingleUserResponse extends StandardResponse<_SingleUserResponse> {}
