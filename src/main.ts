import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorFoundUserFilter } from './filters/error-found-user.filter';
import { ErrorInvalidPasswordFilter } from './filters/error-invalid-password.filter';
import { ErrorUpdateUserFilter } from './filters/error-update-user.filter';
import { ErrorInvalidOldPasswordFilter } from './filters/error-invalid-old-password.filter';
import { ErrorRemoveUserFilter } from './filters/error-remove-user.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new ErrorFoundUserFilter(),
    new ErrorInvalidPasswordFilter(),
    new ErrorInvalidOldPasswordFilter(),
    new ErrorUpdateUserFilter(),
    new ErrorRemoveUserFilter(),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
