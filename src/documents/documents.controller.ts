import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Permission } from '../permit/permit.guard';
import { Document } from './entities/document.entity';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @Permission('Document', 'read')
  findAll(): Document[] {
    return this.documentsService.findAll();
  }

  @Get(':id')
  @Permission('Document', 'read', 'id')
  findOne(@Param('id') id: string): Document {
    return this.documentsService.findOne(id);
  }

  @Post()
  @Permission('Document', 'create')
  create(
    @Body() createDocumentDto: CreateDocumentDto,
  ): Document {
    return this.documentsService.create(createDocumentDto);
  }

  @Patch(':id')
  @Permission('Document', 'update', 'id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Document {
    return this.documentsService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  @Permission('Document', 'delete', 'id')
  remove(@Param('id') id: string): void {
    return this.documentsService.remove(id);
  }
}