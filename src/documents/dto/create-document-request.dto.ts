import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { StandardRequest } from '../../common/entities/StandardRequest';

export class CreateDocumentRequestDto extends StandardRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  owners: string[];

  @IsArray()
  editors?: string[];

  @IsArray()
  viewers?: string[];
}
