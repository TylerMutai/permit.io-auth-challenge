export const PERMISSION_METADATA_KEY = 'permission';

export interface PermissionMetadata {
  resource: string;
  action: string;
}

export function PermissionDecorator({ resource, action }: PermissionMetadata) {
  return Reflect.metadata(PERMISSION_METADATA_KEY, {
    resource,
    action,
  });
}
