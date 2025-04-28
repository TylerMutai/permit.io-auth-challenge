import { StandardRequest } from '../../common/entities/StandardRequest';
import { IsArray, IsString } from 'class-validator';

export class UpdateDocumentRequestDto extends StandardRequest {
  @IsString()
  title?: string;

  @IsString()
  content?: string;

  @IsArray()
  owners?: string[];

  @IsArray()
  editors?: string[];

  @IsArray()
  viewers?: string[];
}
