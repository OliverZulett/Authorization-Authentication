import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotImplementedException } from '@nestjs/common';
import { UserRepository } from '../../persistance/repositories/user.repository';
import { UserSingInDto } from './dto/user-singIn.dto';
import { UserSingUpDto } from './dto/user-singUp.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async signIn(userSingInDto: UserSingInDto) {
    throw new NotImplementedException('Method not implemented');
  }

  async signUp(userSingUpDto: UserSingUpDto) {
    if (!userSingUpDto.username) {
      userSingUpDto.username = userSingUpDto.email;
    }
    if (await this.userRepository.findUserByUserName(userSingUpDto.username)) {
      throw new BadRequestException('UserName already exists');
    }
    if (await this.userRepository.findUserByEmail(userSingUpDto.email)) {
      throw new BadRequestException('Email already exists');
    }
    try {
      return await this.userRepository.save(userSingUpDto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating new user in DB');
    }
  }
}
