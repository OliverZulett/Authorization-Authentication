import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { UserRepository } from '../../persistance/repositories/user.repository';
import { UserSingInDto } from './dto/user-singIn.dto';
import { UserSingUpDto } from './dto/user-singUp.dto';
import { BcryptService } from '../../shared/services/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './models/user.model';
import { RoleRepository } from '../../persistance/repositories/role.repository';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userSingInDto: UserSingInDto) {
    const userFound = await this.userRepository.findUserByEmail(
      userSingInDto.email,
    );
    if (!userFound) {
      throw new NotFoundException(`User dosen't exists`);
    }
    const passwordIsValid = await this.passwordIsValid(
      userSingInDto.password,
      userFound.hash,
    );
    if (passwordIsValid) {
      return this.getAccessToken({
        id: userFound.id,
        name: userFound.username,
        email: userFound.email,
        role: userFound.role.name,
      });
    }
    throw new BadRequestException('Invalid password');
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
    const passwordHashed = await this.hashPassword(userSingUpDto.password);
    const defaultRole = await this.roleRepository.findDefaultRole();
    try {
      const userFound = await this.userRepository.save({
        ...userSingUpDto,
        hash: passwordHashed,
        role: defaultRole,
      });
      return this.getAccessToken({
        id: userFound.id,
        name: userFound.username,
        email: userFound.email,
        role: defaultRole.name,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating new user in DB');
    }
  }

  private async hashPassword(password: string) {
    try {
      return await this.bcryptService.getHash(password);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error hashing the password');
    }
  }

  private async passwordIsValid(password: string, hash: string) {
    try {
      return await this.bcryptService.isMatch(password, hash);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error validating password with bcrypt',
      );
    }
  }

  private getAccessToken(user: User) {
    try {
      const accessToken = this.jwtService.sign(user);
      return { access_token: accessToken };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error creating access token');
    }
  }
}
