import { StandardRequest } from '../../common/entities/StandardRequest';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SingleUserRequest extends StandardRequest {
  @IsNotEmpty()
  id?: string;

  @IsEmail()
  email?: string;
}
