import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'
import { LoginUserDto } from '../users/dto/login-user.dto'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { ErrorEnum } from '../types/enums'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(user: User): Promise<{ token: string; refreshToken: string }> {
        try {
            return this.generateToken(user)
        } catch (e) {
            throw e
        }
    }

    async registration(
        createUserDto: CreateUserDto,
        image?: string
    ): Promise<{ token: string; refreshToken: string }> {
        const candidate = await this.usersService.findOneByEmail(createUserDto.email)

        if (candidate) {
            throw new HttpException(
                ErrorEnum.USER_WITH_SUCH_EMAIL_EXISTS,
                HttpStatus.BAD_REQUEST,
            )
        }

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(createUserDto.password, salt)
        const newUser = await this.usersService.createUser(
            { ...createUserDto, password: hashPassword },
            image
        )

        return this.generateToken(newUser)
    }

    async refreshToken(user: User): Promise<{ token: string }> {
        try {
            const { token } = await this.generateToken(user)
            return { token }
        } catch (e) {
            throw e
        }
    }

    private async generateToken(
        user: User,
    ): Promise<{ token: string; refreshToken: string }> {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        return {
            token: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        }
    }

    async validateUser(loginDto: LoginUserDto): Promise<User> {
        const { email, password } = loginDto || {}
        const user = await this.usersService.findOneByEmail(email)

        if (!user) {
            throw new UnauthorizedException(ErrorEnum.EMAIL_IS_INCORRECT)
        }

        const match = await bcrypt.compare(password, user?.password)

        if (!match) {
            throw new UnauthorizedException(ErrorEnum.PASSWORD_IS_INCORRECT)
        }

        return user
    }
}
