import { StandardRequest } from '../../common/entities/StandardRequest';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateDocumentRequestDto extends StandardRequest {
  @IsString()
  title?: string;

  @IsString()
  content?: string;

  @IsOptional()
  @IsArray()
  owners?: string[];

  @IsOptional()
  @IsArray()
  editors?: string[];

  @IsOptional()
  @IsArray()
  viewers?: string[];
}
