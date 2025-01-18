import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorFoundUserFilter } from './filters/error-found-user.filter';
import { ErrorInvalidPasswordFilter } from './filters/error-invalid-password.filter';
import { ErrorUpdateUserFilter } from './filters/error-update-user.filter';
import { ErrorInvalidOldPasswordFilter } from './filters/error-invalid-old-password.filter';
import { ErrorRemoveUserFilter } from './filters/error-remove-user.filter';
import { ErrorRoleUserFilter } from './filters/error-role-user.filter';
import { ErrorEmptyIntermediaryFilter } from './filters/error-empty-intermediary.filter';
import { ErrorRemoveExpenseFilter } from './filters/error-remove-expense.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new ErrorFoundUserFilter(),
    new ErrorInvalidPasswordFilter(),
    new ErrorInvalidOldPasswordFilter(),
    new ErrorUpdateUserFilter(),
    new ErrorRemoveUserFilter(),
    new ErrorRoleUserFilter(),
    new ErrorEmptyIntermediaryFilter(),
    new ErrorRemoveExpenseFilter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
