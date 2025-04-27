import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { PermissionsGuard } from './permissions/permissions.guard';
import { ValidationPipe } from '@nestjs/common';
import { RESTHttpExceptionFilter } from './common/filters/httpException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(app.get(AuthGuard), app.get(PermissionsGuard));
  app.useGlobalFilters(new RESTHttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000);

  console.log('Application is running on: http://localhost:3000');
}

void bootstrap().then();
