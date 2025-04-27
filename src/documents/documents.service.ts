import { Injectable, NotFoundException } from '@nestjs/common';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DocumentsService {
  private documents: Document[] = [];

  findAll(): Document[] {
    return this.documents;
  }

  findOne(id: string): Document {
    const doc = this.documents.find((d) => d.id === id);
    if (!doc) {
      throw new NotFoundException(`Document ${id} not found`);
    }
    return doc;
  }

  create(createDto: CreateDocumentDto): Document {
    const doc: Document = { id: uuidv4(), ...createDto };
    this.documents.push(doc);
    return doc;
  }

  update(id: string, updateDto: UpdateDocumentDto): Document {
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