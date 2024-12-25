import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

dotenv.config()

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const corsOptions: CorsOptions = {
        origin: 'http://localhost:3000', // Указываем домен клиента (например, фронтенд на localhost:3000)
        methods: 'GET,POST,PUT,DELETE,OPTIONS', // Разрешаем только определенные методы
        allowedHeaders: 'Content-Type, Authorization', // Разрешаем нужные заголовки
        credentials: true, // Позволяет передавать cookie
    }

    app.enableCors(corsOptions) // Включаем CORS с настройками

    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
