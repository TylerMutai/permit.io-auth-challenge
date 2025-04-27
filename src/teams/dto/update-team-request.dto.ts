import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTeamRequestDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  name?: string;

  @IsArray()
  userIds?: string[];
}
