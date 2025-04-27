import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  userIds: string[];
}
