require('dotenv').config()
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static extractJWT(req: Request) {
    try{
      return req.cookies.jwt;
    } catch(err){
      throw new UnauthorizedException('token not found')
    }
  }

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: true,
      secretOrKey: process.env.JWTSECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
