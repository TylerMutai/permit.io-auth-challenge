import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BasicAuthGuard } from './auth/basic-auth.guard';
import { PermitGuard } from './permit/permit.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(app.get(BasicAuthGuard), app.get(PermitGuard));
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
