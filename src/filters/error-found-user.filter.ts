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
      message: 'Houve um erro ao tentar encontrar um usuário',
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
