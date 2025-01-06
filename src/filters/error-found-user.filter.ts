import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorFoundUser } from 'src/errors/errors';

@Catch(ErrorFoundUser)
export class ErrorFoundUserFilter implements ExceptionFilter {
  catch(exception: ErrorFoundUser, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      message: 'Usuário não encontrado',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
