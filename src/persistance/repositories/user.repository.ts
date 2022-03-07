import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  private logger = new Logger(UserRepository.name);

  async findUserByUserName(userName: string) {
    try {
      return await this.createQueryBuilder('USERS')
        .where('USERS.user_name = :value', { value: userName })
        .getOne();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error finding user by username in DB',
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.createQueryBuilder('USERS')
        .where('USERS.email = :value', { value: email })
        .leftJoinAndSelect('USERS.role', 'ROLES')
        .getOne();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error finding user by email in DB',
      );
    }
  }
}
