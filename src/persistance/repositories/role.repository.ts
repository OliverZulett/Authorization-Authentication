import { EntityRepository, Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {
  private logger = new Logger(RoleRepository.name);

  async findDefaultRole(defaultRole = 'USER') {
    try {
      return await this.createQueryBuilder('ROLES')
        .where('ROLES.name = :value', { value: defaultRole })
        .getOne();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Error finding role by role name in DB',
      );
    }
  }
}
