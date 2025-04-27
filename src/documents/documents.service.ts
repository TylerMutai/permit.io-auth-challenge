import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentModel } from './entities/document.entity';
import { CreateDocumentRequestDto } from './dto/create-document-request.dto';
import { UpdateDocumentRequestDto } from './dto/update-document-request.dto';
import crypto from 'node:crypto';

@Injectable()
export class DocumentsService {
  private documents: DocumentModel[] = [];

  findAll(): DocumentModel[] {
    return this.documents;
  }

  findOne(id: string): DocumentModel {
    const doc = this.documents.find((d) => d.id === id);
    if (!doc) {
      throw new NotFoundException(`Document ${id} not found`);
    }
    return doc;
  }

  create(createDto: CreateDocumentRequestDto): DocumentModel {
    const doc: DocumentModel = { id: crypto.randomUUID(), ...createDto };
    this.documents.push(doc);
    return doc;
  }

  update(id: string, updateDto: UpdateDocumentRequestDto): DocumentModel {
    const doc = this.findOne(id);
    Object.assign(doc, updateDto);
    return doc;
  }

  remove(id: string): void {
    const index = this.documents.findIndex((d) => d.id === id);
    if (index === -1) {
      throw new NotFoundException(`Document ${id} not found`);
    }
    this.documents.splice(index, 1);
  }
}
