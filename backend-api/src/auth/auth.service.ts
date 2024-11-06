import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { User } from './user.shema'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new this.userModel({ email, password: hashedPassword })
    return newUser.save()
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject()
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
