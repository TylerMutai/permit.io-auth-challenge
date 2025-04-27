import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { TeamsModule } from './teams/teams.module';
import { DocumentsModule } from './documents/documents.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    UsersModule,
    PermissionsModule,
    TeamsModule,
    DocumentsModule,
  ],
})
export class AppModule {}
