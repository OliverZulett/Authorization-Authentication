import {
  Column,
  CreateDateColumn,
  Entity,
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
    name: 'password',
    nullable: false,
    unique: false,
    length: 255,
  })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
