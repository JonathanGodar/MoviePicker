import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginGuard } from './guards/login.guard';

@Global()
@Module({
  providers: [AuthResolver, AuthService, LoginGuard],
  imports: [UserModule, ConfigModule],
  exports: [AuthService, LoginGuard]
})
export class AuthModule {}