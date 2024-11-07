import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token || await this.authService.isTokenRevoked(token)) {
            return false;
        }

        try {
            request.user = this.jwtService.verify(token);
            return true;
        } catch {
            return false;
        }
    }
}
