
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { BasicStrategy as Strategy } from 'passport-http';
@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (
    req: Request,
    username: string,
    password: string,
  ) => {
    if (
      process.env.API_USER === username &&
      process.env.API_PASS === password
    ) {
      return true;
    }
    throw new UnauthorizedException('Invalid API credentials');
  };
}
