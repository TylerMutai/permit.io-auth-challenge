import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PermitModule } from './permit/permit.module';
import { TeamsModule } from './teams/teams.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PermitModule,
    TeamsModule,
    DocumentsModule,
  ],
})
export class AppModule {}