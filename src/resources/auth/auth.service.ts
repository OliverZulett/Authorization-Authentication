import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../persistance/repositories/user.repository';
import { UserSingInDto } from './dto/user-singIn.dto';
import { UserSingUpDto } from './dto/user-singUp.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signIn(userSingInDto: UserSingInDto) {
    
  }

  async signUp(userSingUpDto: UserSingUpDto) {
    return await this.userRepository.save(userSingUpDto);
  }
}
