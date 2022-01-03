import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { JWTStrategy } from './strategies/auth.jwt';
import { LocalStrategy } from './strategies/auth.local';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, LocalStrategy, JWTStrategy],
  exports: [AuthService],
})
export class AuthModule {}
