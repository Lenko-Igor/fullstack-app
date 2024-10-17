import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req) {
    return this.authService.login(req.user)
  }

  @Post('signup')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto)
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user)
  }
}
