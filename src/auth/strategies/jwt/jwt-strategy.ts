import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { join } from 'path';
import * as fs from 'fs';
import { User } from 'src/resources/auth/models/user.model';

const PUBLIC_KEY = fs.readFileSync(join(process.cwd(), '/certs/publickey.crt'));

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: PUBLIC_KEY,
    });
  }
  async validate(payload: User) {
    return {
      user_role: payload.role,
      user_id: payload.id,
      user_email: payload.email,
    };
  }
}
