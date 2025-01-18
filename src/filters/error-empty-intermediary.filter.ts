import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorEmptyIntermediary } from 'src/errors/errors';

@Catch(ErrorEmptyIntermediary)
export class ErrorEmptyIntermediaryFilter implements ExceptionFilter {
  catch(exception: ErrorEmptyIntermediary, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      message: 'Deve-se inserir o ID do terceiro da conta',
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
