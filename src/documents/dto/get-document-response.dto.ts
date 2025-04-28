import { StandardResponse } from '../../common/entities/StandardResponse';
import { DocumentModel } from '../entities/document.entity';

export class GetDocumentResponseDto extends StandardResponse<DocumentModel> {}
