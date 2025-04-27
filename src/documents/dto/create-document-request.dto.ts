import { IsNotEmpty, IsString } from 'class-validator';
import { StandardRequest } from '../../common/entities/StandardRequest';

export class CreateDocumentRequestDto extends StandardRequest {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  teamId: string;
}
