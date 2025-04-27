import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BasicAuthGuard } from './auth/basic-auth.guard';
import { PermitGuard } from './permit/permit.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(
    app.get(BasicAuthGuard),
    app.get(PermitGuard),
  );
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}

bootstrap();