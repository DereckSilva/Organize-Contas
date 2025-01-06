import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorInvalidOldPassword } from 'src/errors/errors';

@Catch(ErrorInvalidOldPassword)
export class ErrorInvalidOldPasswordFilter implements ExceptionFilter {
  catch(exception: ErrorInvalidOldPassword, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      message: 'A senha atual está inválida',
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
