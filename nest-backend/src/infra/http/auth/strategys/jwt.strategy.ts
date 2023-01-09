import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: any, done: VerifiedCallback) {

    if (Date.now() > payload.exp * 1000) {
      throw new UnauthorizedException('token_expired');
    }

    done(null, { userId: payload.sub, username: payload.username });

  }
}