import { StandardRequest } from '../../common/entities/StandardRequest';
import { IsString } from 'class-validator';

export class UpdateDocumentRequestDto extends StandardRequest {
  @IsString()
  title?: string;

  @IsString()
  content?: string;
}
