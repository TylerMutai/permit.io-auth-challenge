import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { StandardRequest } from '../../common/entities/StandardRequest';

export class CreateTeamRequestDto extends StandardRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  userIds: string[];
}
