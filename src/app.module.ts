import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './persistance/entities/user.entity';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.prod.env', '.local.env', '.env'],
    }),
    TypeOrmModule.forRoot({
      name: 'MYSQL_CONNECTION',
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [UserEntity],
      autoLoadEntities: process.env.NODE_ENV === 'development' ? true : false,
      synchronize: process.env.NODE_ENV === 'development' ? true : false,
      logging: process.env.NODE_ENV === 'development' ? 'all' : false,
    }),
    ResourcesModule
  ],
})
export class AppModule {}
