import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorRemoveUser } from 'src/errors/errors';

@Catch(ErrorRemoveUser)
export class ErrorRemoveUserFilter implements ExceptionFilter {
  catch(exception: ErrorRemoveUser, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      message: 'Houve um erro ao remover um usuário',
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
