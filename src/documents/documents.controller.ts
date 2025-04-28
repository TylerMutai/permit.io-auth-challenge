import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentRequestDto } from './dto/create-document-request.dto';
import { UpdateDocumentRequestDto } from './dto/update-document-request.dto';
import { PermissionDecorator } from '../permissions/permissions.decorator';
import { StandardResponse } from '../common/entities/StandardResponse';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from '../permissions/permissions.guard';
import { CreateDocumentResponseDto } from './dto/create-document-response.dto';
import { GetDocumentRequestDto } from './dto/get-document-request.dto';
import { GetDocumentsResponseDto } from './dto/get-documents-response.dto';
import { RESTUserDecorator } from '../users/user.decorator';
import { UserModel } from '../users/entities/UserModel';

@Controller('documents')
@UseGuards(AuthGuard, PermissionsGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get()
  @PermissionDecorator({ resource: 'Document', action: 'read' })
  findAll(): GetDocumentsResponseDto {
    return this.documentsService.findAll();
  }

  @Get(':id')
  findOne(
    @RESTUserDecorator() user: UserModel,
    @Param() req: GetDocumentRequestDto,
  ) {
    return this.documentsService.findOne(user, req);
  }

  @Post()
  @PermissionDecorator({ resource: 'Document', action: 'create' })
  create(
    @Body() createDocumentDto: CreateDocumentRequestDto,
  ): CreateDocumentResponseDto {
    return this.documentsService.create(createDocumentDto);
  }

  @Patch(':id')
  @PermissionDecorator({ resource: 'Document', action: 'update' })
  update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentRequestDto,
    @RESTUserDecorator() user: UserModel,
  ) {
    return this.documentsService.update(id, updateDocumentDto, user);
  }

  @Delete(':id')
  @PermissionDecorator({ resource: 'Document', action: 'delete' })
  remove(@Param('id') id: string): StandardResponse {
    return this.documentsService.remove(id);
  }
}
