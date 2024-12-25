import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { User } from '../user/user.schema'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.validateUser(email, password)
        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }
        return user
    }

    async login(user: User): Promise<{ access_token: string }> {
        //@ts-ignore
        const payload = { email: user.email, sub: user._id }
        return { access_token: this.jwtService.sign(payload) }
    }
}
