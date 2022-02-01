import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'development'
        ? ['log', 'debug', 'error', 'verbose', 'warn']
        : ['error', 'warn', 'debug'],
  });
	app.setGlobalPrefix(process.env.API_VERSION);
  await app.listen(process.env.API_PORT);
}
bootstrap();
