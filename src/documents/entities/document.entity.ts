import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DocumentModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  // Store userIds of owners.
  @IsArray()
  owners: Set<string>;

  // Store userIds of editors.
  @IsArray()
  editors: Set<string>;

  // Store userIds of viewers.
  @IsArray()
  viewers: Set<string>;
}

export const toDocumentModel = (d: DocumentModelDto) => {
  return {
    ...d,
    owners: new Set(d.owners),
    viewers: new Set(d.viewers),
    editors: new Set(d.editors),
  };
};

export const toDocumentDtoModel = (d: DocumentModel) => {
  return {
    ...d,
    owners: Array.from(d.owners.values()),
    viewers: Array.from(d.viewers.values()),
    editors: Array.from(d.editors.values()),
  };
};

export class DocumentModelDto {
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  // Store userIds of owners.
  @IsArray()
  owners: string[];

  // Store userIds of editors.
  @IsArray()
  editors: string[];

  // Store userIds of viewers.
  @IsArray()
  viewers: string[];
}
