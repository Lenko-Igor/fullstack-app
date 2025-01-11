import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req) {
        return this.authService.login(req.user)
    }

    @Post('signup')
    @UseInterceptors(FileInterceptor('image'))
    registration(
        @Body() createUserDto: CreateUserDto,
        @UploadedFile() image: string
    ) {
        return this.authService.registration(createUserDto, image)
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    refreshToken(@Req() req) {
        return this.authService.refreshToken(req.user)
    }
}
