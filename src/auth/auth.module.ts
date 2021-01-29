import { Module } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService],
  imports: [UserModule],
})
export class AuthModule {}
