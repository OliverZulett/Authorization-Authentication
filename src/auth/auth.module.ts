import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import * as fs from 'fs';

const PRIVATE_KEY = fs.readFileSync(
  join(process.cwd(), '/certs/keypair.pem')
);

const PUBLIC_KEY = fs.readFileSync(
  join(process.cwd(), '/certs/publickey.crt')
);

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: PRIVATE_KEY,
      publicKey: PUBLIC_KEY,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'RS256',
      }
    })
  ],
  providers: [JwtStrategy]
})
export class AuthModule {}
