import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './user.shema';
import { RevokedToken } from './revoked-token.schema';

@Injectable()
export class AuthService {
  constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      @InjectModel(RevokedToken.name) private revokedTokenModel: Model<RevokedToken>,
      private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });
    return newUser.save();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(token: string) {
    await this.revokedTokenModel.create({ token });
    return { message: 'Logout successful' };
  }

  async isTokenRevoked(token: string): Promise<boolean> {
    const revokedToken = await this.revokedTokenModel.findOne({ token });
    return !!revokedToken;
  }
}
