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
    res.message = exception.message;

    // TODO: Log to a backend service?
    console.error('HTTPExceptionFilter exception: ', exception);
    return response.status(res.status).json(res);
  }
}
