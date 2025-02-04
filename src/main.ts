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
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { UserModule } from './api-docs/users/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appSwagger = await NestFactory.create(UserModule);
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

  const options = new DocumentBuilder()
    .setTitle('Organizador de Contas')
    .setDescription(
      'Essa API tem como foco principal a organização de contas de usuários',
    )
    .setVersion('1.0')
    .addTag('User')
    .addTag('Expense')
    .build();

  const document = SwaggerModule.createDocument(appSwagger, options);
  SwaggerModule.setup('api-docs', appSwagger, document);
  await app.listen(process.env.PORT ?? 3000);
  await appSwagger.listen(process.env.PORT ?? 3001);
}
bootstrap();
