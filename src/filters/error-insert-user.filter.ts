import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorInsertUser } from 'src/errors/errors';

@Catch(ErrorInsertUser)
export class ErrorInsertUserFilter implements ExceptionFilter {
  catch(exception: ErrorInsertUser, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      message: 'Houve um erro ao realizar a inserção do usuário',
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
