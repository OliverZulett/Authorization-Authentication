import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../persistance/repositories/user.repository';
import { BcryptService } from '../../shared/services/bcrypt/bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService]
})
export class AuthModule {}
