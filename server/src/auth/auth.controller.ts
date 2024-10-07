import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto } from '../users/dto/login-user.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { User } from '../users/entities/user.entity'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req) {
        return this.authService.login(req.user)
    }
}
