import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentRequestDto } from './dto/create-document-request.dto';
import { UpdateDocumentRequestDto } from './dto/update-document-request.dto';
import { DocumentModel } from './entities/document.entity';
import { PermissionDecorator } from '../permissions/permissions.decorator';
import { StandardResponse } from '../common/entities/StandardResponse';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @PermissionDecorator({ resource: 'Document', action: 'read' })
  findAll(): DocumentModel[] {
    return this.documentsService.findAll();
  }

  @Get(':id')
  @PermissionDecorator({ resource: 'Document', action: 'read' })
  findOne(@Param('id') id: string): DocumentModel {
    return this.documentsService.findOne(id);
  }

  @Post()
  @PermissionDecorator({ resource: 'Document', action: 'create' })
  create(@Body() createDocumentDto: CreateDocumentRequestDto): DocumentModel {
    return this.documentsService.create(createDocumentDto);
  }

  @Patch(':id')
  @PermissionDecorator({ resource: 'Document', action: 'update' })
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentRequestDto,
  ): DocumentModel {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @PermissionDecorator({ resource: 'Document', action: 'delete' })
  remove(@Param('id') id: string): StandardResponse {
    return this.documentsService.remove(id);
  }
}
