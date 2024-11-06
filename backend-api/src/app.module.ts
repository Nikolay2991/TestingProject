import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HelloController } from './hello/hello.controller'
import { HelloService } from './hello/hello.service'
import { HelloModule } from './hello/hello.module'
import { AuthModule } from './auth/auth.module'
import * as dotenv from 'dotenv'
import { AuthController } from './auth/auth.controller'

dotenv.config()

@Module({
  imports: [HelloModule, MongooseModule.forRoot(process.env.MONGO_URI), AuthModule],
  controllers: [AppController, HelloController, AuthController],
  providers: [AppService, HelloService],
})
export class AppModule {}
