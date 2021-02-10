import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginGuard } from './guards/login.guard';

@Module({
  providers: [AuthResolver, AuthService, LoginGuard],
  imports: [UserModule, ConfigModule],
})
export class AuthModule {}