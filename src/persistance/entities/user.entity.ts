import { RoleEntity } from './role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'USERS',
  engine: 'InnoDB',
})
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('varchar', {
    name: 'email',
    nullable: false,
    unique: true,
    length: 255,
  })
  email: string;

  @Column('varchar', {
    name: 'user_name',
    nullable: false,
    unique: true,
    length: 255,
  })
  username: string;

  @Column('varchar', {
    name: 'hash',
    nullable: false,
    length: 255,
  })
  hash: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => RoleEntity, (role) => role.user)
  @JoinColumn({
    name: 'role_id',
  })
  role: RoleEntity;
}
