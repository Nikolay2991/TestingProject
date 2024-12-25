import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('register')
    async register(@Body() body: { email: string; password: string }) {
        console.log(body.password, body.email)
        const user = await this.userService.createUser(body.email, body.password)
        return { message: 'User registered successfully', user }
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.authService.validateUser(body.email, body.password)
        return this.authService.login(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Req() req) {
        return req.user
    }

    @Post('logout')
    logout(@Req() req, @Res() res) {
        res.clearCookie('jwt') // Удаляем cookie с JWT (если используется)
        return res.status(200).json({ message: 'Logged out successfully' })
    }
}
