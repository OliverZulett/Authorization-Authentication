import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './persistance/entities/user.entity';
import { ResourcesModule } from './resources/resources.module';
import { SharedModule } from './shared/shared.module';
import { RoleEntity } from './persistance/entities/role.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.prod.env', '.local.env', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [UserEntity, RoleEntity],
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development' ? true : false,
      logging: process.env.NODE_ENV === 'development' ? 'all' : false,
    }),
    ResourcesModule,
    SharedModule,
    AuthModule
  ],
})
export class AppModule {}
