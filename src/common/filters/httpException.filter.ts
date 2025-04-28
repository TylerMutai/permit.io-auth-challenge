import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { StandardResponse } from '../entities/StandardResponse';

@Catch(HttpException)
export class RESTHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const res = new StandardResponse();
    res.status = exception.getStatus();

    const message1 = exception.message;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const message2: string = (exception.getResponse() as any)?.message || '';
    res.message = `${message1} ${message1 !== message2 ? message2 : ''}`;

    // TODO: Log to a backend service?
    console.error('HTTPExceptionFilter exception: ', exception);
    return response.status(res.status).json(res);
  }
}
