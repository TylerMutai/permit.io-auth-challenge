import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StandardRequest } from '../../common/entities/StandardRequest';

export class CreateDocumentRequestDto extends StandardRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsArray()
  owners: string[];

  @IsOptional()
  @IsArray()
  editors?: string[];

  @IsOptional()
  @IsArray()
  viewers?: string[];
}
