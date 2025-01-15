import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorRoleUser } from 'src/errors/errors';

@Catch(ErrorRoleUser)
export class ErrorRoleUserFilter implements ExceptionFilter {
  catch(exception: ErrorRoleUser, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const user = exception.USER;

    response.status(HttpStatus.NOT_FOUND).json({
      message: `O usuário ${user} não tem a função adequada para realizar uma atualização na conta de terceiros`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
