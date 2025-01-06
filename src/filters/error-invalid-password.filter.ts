import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorInvalidPassword } from 'src/errors/errors';

@Catch(ErrorInvalidPassword)
export class ErrorInvalidPasswordFilter implements ExceptionFilter {
  catch(exception: ErrorInvalidPassword, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      message: 'Senha Inválida',
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
