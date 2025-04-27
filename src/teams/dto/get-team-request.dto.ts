import { IsNotEmpty, IsString } from 'class-validator';
import { StandardRequest } from '../../common/entities/StandardRequest';

export class GetTeamRequestDto extends StandardRequest {
  @IsNotEmpty()
  @IsString()
  id: string;
}
