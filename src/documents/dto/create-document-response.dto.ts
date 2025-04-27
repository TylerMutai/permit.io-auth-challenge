import { StandardResponse } from '../../common/entities/StandardResponse';
import { DocumentModel } from '../entities/document.entity';

export class CreateDocumentResponseDto extends StandardResponse<DocumentModel> {}
