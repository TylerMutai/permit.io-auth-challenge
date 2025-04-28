import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentModel } from './entities/document.entity';
import { CreateDocumentRequestDto } from './dto/create-document-request.dto';
import { UpdateDocumentRequestDto } from './dto/update-document-request.dto';
import crypto from 'node:crypto';
import { StandardResponse } from '../common/entities/StandardResponse';

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
    // Ignored user validation intentionally for purposes of the demo.
    const { owners, viewers, editors } = this.getDocUsers({
      owners: createDto.owners,
      editors: createDto.editors,
      viewers: createDto.viewers,
    });

    const doc: DocumentModel = {
      id: crypto.randomUUID(),
      ...createDto,
      owners,
      viewers,
      editors,
    };
    this.documents.push(doc);
    return doc;
  }

  update(id: string, updateDto: UpdateDocumentRequestDto): DocumentModel {
    const doc = this.findOne(id);

    // Ignored user validation intentionally for purposes of the demo.
    const { owners, viewers, editors } = this.getDocUsers({
      owners: updateDto.owners || Array.from(doc.owners),
      editors: updateDto.editors || Array.from(doc.editors),
      viewers: updateDto.viewers || Array.from(doc.viewers),
    });

    Object.assign(doc, { ...updateDto, owners, viewers, editors });
    return doc;
  }

  remove(id: string): StandardResponse {
    const index = this.documents.findIndex((d) => d.id === id);
    if (index === -1) {
      throw new NotFoundException(`Document ${id} not found`);
    }
    this.documents.splice(index, 1);
    return {
      status: 204,
      message: 'Success',
    };
  }

  private getDocUsers({
    owners,
    editors,
    viewers,
  }: {
    owners?: string[];
    editors?: string[];
    viewers?: string[];
  }) {
    const ownersSet = new Set(owners || []);
    const viewersSet = new Set(editors || []);
    const editorsSet = new Set(viewers || []);

    return { owners: ownersSet, viewers: viewersSet, editors: editorsSet };
  }
}
