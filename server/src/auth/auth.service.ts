import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'
import { WARNING_MESSAGES } from '../utiles/constants'
import { LoginUserDto } from '../users/dto/login-user.dto'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async login(user: User): Promise<{ token: string }> {
        try {
            return this.generateToken(user)
        } catch (e) {
            throw e
        }
    }

    private async generateToken(user: User): Promise<{ token: string }> {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        return {
            token: this.jwtService.sign(payload),
        }
    }

    async validateUser(loginDto: LoginUserDto): Promise<User> {
        const { email, password } = loginDto || {}
        const user = await this.usersService.findOneByEmail(email)

        if (!user) {
            throw new UnauthorizedException(WARNING_MESSAGES.EMAIL_INCORRECT)
        }

        const match = await bcrypt.compare(password, user?.password)

        if (!match) {
            throw new UnauthorizedException(WARNING_MESSAGES.PASSWORD_INCORRECT)
        }

        return user
    }
}
