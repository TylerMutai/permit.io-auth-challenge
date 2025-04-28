import { UserModel } from '../entities/UserModel';
import { StandardResponse } from '../../common/entities/StandardResponse';
import { OmitType } from '@nestjs/mapped-types';

class _SingleUserResponse extends OmitType(UserModel, ['password'] as const) {}

export class SingleUserResponseDto extends StandardResponse<_SingleUserResponse> {}

export class SingleUserResponseWithPasswordDto extends StandardResponse<UserModel> {}
