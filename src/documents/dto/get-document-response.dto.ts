import { StandardResponse } from '../../common/entities/StandardResponse';
import { DocumentModelDto } from '../entities/document.entity';

export class GetDocumentResponseDto extends StandardResponse<DocumentModelDto> {}
