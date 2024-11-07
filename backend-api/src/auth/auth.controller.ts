import { Controller, Post, Body, Request, UseGuards, BadRequestException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new BadRequestException('Email and password are required')
    }
    console.log(body, 'body')
    return this.authService.register(body.email, body.password)
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password)
    if (!user) {
      return { error: 'Invalid credentials' }
    }
    return this.authService.login(user)
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    await this.authService.logout(token);
    return { message: 'Logout successful' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
