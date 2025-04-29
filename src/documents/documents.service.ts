import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DocumentModel, toDocumentDtoModel } from './entities/document.entity';
import { CreateDocumentRequestDto } from './dto/create-document-request.dto';
import { UpdateDocumentRequestDto } from './dto/update-document-request.dto';
import * as crypto from 'node:crypto';
import { StandardResponse } from '../common/entities/StandardResponse';
import { GetDocumentResponseDto } from './dto/get-document-response.dto';
import { GetDocumentRequestDto } from './dto/get-document-request.dto';
import { CreateDocumentResponseDto } from './dto/create-document-response.dto';
import { UpdateDocumentResponseDto } from './dto/update-document-response.dto';
import { GetDocumentsResponseDto } from './dto/get-documents-response.dto';
import { UserModel } from '../users/entities/UserModel';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class DocumentsService {
  private documents: DocumentModel[] = [];

  constructor(private readonly permissionsService: PermissionsService) {}

  findAll(): GetDocumentsResponseDto {
    return {
      status: 200,
      message: 'Success',
      payload: this.documents.map((d) => toDocumentDtoModel(d)),
    };
  }

  async findOne(
    user: UserModel,
    { id }: GetDocumentRequestDto,
  ): Promise<GetDocumentResponseDto> {
    const doc = this.documents.find((d) => d.id === id);
    if (!doc) {
      throw new NotFoundException(`Document ${id} not found`);
    }
    const _doc = toDocumentDtoModel(doc);
    // check document permissions.
    const isPermitted = await this.permissionsService.checkPermission({
      user: {
        key: user.id,
      },
      resource: {
        type: 'Document',
        attributes: {
          owners: _doc.owners,
          editors: _doc.editors,
          viewers: _doc.viewers,
        },
      },
      action: 'readone',
    });

    if (!isPermitted) {
      throw new ForbiddenException(`User not allowed to access document ${id}`);
    }
    return {
      status: 200,
      message: 'Success',
      payload: toDocumentDtoModel(doc),
    };
  }

  create(createDto: CreateDocumentRequestDto): CreateDocumentResponseDto {
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
      editors,
      viewers,
    };
    this.documents.push(doc);
    return {
      status: 200,
      message: 'Success',
      payload: {
        ...doc,
        owners: Array.from(owners.values()),
        viewers: Array.from(viewers.values()),
        editors: Array.from(editors.values()),
      },
    };
  }

  async update(
    id: string,
    updateDto: UpdateDocumentRequestDto,
    user: UserModel,
  ): Promise<UpdateDocumentResponseDto> {
    const doc = await this.findOne(user, { id });
    const idx = this.documents.findIndex((d) => d.id === id);

    // Ignored user validation intentionally for purposes of the demo.
    const _owners =
      updateDto.owners ||
      Array.from(doc.payload?.owners?.values() || new Set());
    const _editors =
      updateDto.editors ||
      Array.from(doc.payload?.editors?.values() || new Set());
    const _viewers =
      updateDto.viewers ||
      Array.from(doc.payload?.viewers?.values() || new Set());

    const { owners, viewers, editors } = this.getDocUsers({
      owners: _owners,
      editors: _editors,
      viewers: _viewers,
    });

    const docNew = {
      ...doc.payload,
      ...updateDto,
      owners,
      viewers,
      editors,
      id,
    } as DocumentModel;
    this.documents[idx] = docNew;
    return {
      status: 200,
      message: 'Success',
      payload: toDocumentDtoModel({ ...docNew }),
    };
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
