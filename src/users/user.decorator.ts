import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from './entities/UserModel';

export const RESTUserDecorator = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ctx?.switchToHttp()?.getRequest()?.['user'] as UserModel,
);
