import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PermitModule } from './permit/permit.module';
import { TeamsModule } from './teams/teams.module';
import { DocumentsModule } from './documents/documents.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    PermitModule,
    TeamsModule,
    DocumentsModule,
  ],
})
export class AppModule {}
