import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Разрешаем CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Разрешаем доступ с вашего фронтенд сервера
    methods: 'GET,POST,PUT,DELETE', // Разрешенные методы
    allowedHeaders: 'Content-Type, Authorization', // Разрешенные заголовки
  })

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
