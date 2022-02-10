import { UserEntity } from './user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'ROLES',
  engine: 'InnoDB',
})
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('varchar', {
    name: 'type',
    nullable: false,
    unique: true,
    length: 50,
  })
  type: string;

  @Column('varchar', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => UserEntity, user => user.role)
  user: UserEntity;
}
