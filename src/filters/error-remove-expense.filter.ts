import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorRemoveExpense } from 'src/errors/errors';

@Catch(ErrorRemoveExpense)
export class ErrorRemoveExpenseFilter implements ExceptionFilter {
  catch(exception: ErrorRemoveExpense, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      message: 'Houve um erro ao remover uma conta',
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
