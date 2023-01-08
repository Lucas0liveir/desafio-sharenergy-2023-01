import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategys/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { DataBaseModule } from '@infra/database/database.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategys/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { RefreshTokenStrategy } from './strategys/refresh-token.strategy';

@Module({
  imports: [
    DataBaseModule,
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({})
  ],
  providers: [LocalStrategy, AuthService, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService]
})
export class AuthModule { }
