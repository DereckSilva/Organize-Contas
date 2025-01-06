import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorUpdateUser } from 'src/errors/errors';

@Catch(ErrorUpdateUser)
export class ErrorUpdateUserFilter implements ExceptionFilter {
  catch(exception: ErrorUpdateUser, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      message: 'Houve um erro ao realizar atualização do usuário',
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
