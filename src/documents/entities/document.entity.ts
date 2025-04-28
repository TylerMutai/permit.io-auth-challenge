import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DocumentModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  // Store userIds of owners.
  @IsArray()
  owners: Set<string>;

  // Store userIds of editors.
  @IsArray()
  editors: Set<string>;

  // Store userIds of viewers.
  @IsArray()
  viewers: Set<string>;
}
