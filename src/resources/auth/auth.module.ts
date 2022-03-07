import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../persistance/repositories/user.repository';
import { BcryptService } from '../../shared/services/bcrypt/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import * as fs from 'fs';
import { RoleRepository } from '../../persistance/repositories/role.repository';

const PRIVATE_KEY = fs.readFileSync(join(process.cwd(), '/certs/keypair.pem'));

const PUBLIC_KEY = fs.readFileSync(join(process.cwd(), '/certs/publickey.crt'));

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
    JwtModule.register({
      privateKey: PRIVATE_KEY,
      publicKey: PUBLIC_KEY,
      signOptions: {
        expiresIn: '1h',
        algorithm: 'RS256',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
})
export class AuthModule {}
