import { IsArray, IsString } from 'class-validator';

export class UpdateTeamRequestDto {
  @IsString()
  name?: string;

  @IsArray()
  userIds?: string[];
}
