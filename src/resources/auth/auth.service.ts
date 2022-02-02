import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotImplementedException,
} from '@nestjs/common';
import { UserRepository } from '../../persistance/repositories/user.repository';
import { UserSingInDto } from './dto/user-singIn.dto';
import { UserSingUpDto } from './dto/user-singUp.dto';
import { BcryptService } from '../../shared/services/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

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
    let passwordHashed;
    try {
      passwordHashed = await this.bcryptService.getHash(userSingUpDto.password);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error hashing the password')
    }
    try {
      return await this.userRepository.save({...userSingUpDto, hash: passwordHashed});
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating new user in DB');
    }
  }
}
