import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class TeamModel {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  userIds: string[];
}
