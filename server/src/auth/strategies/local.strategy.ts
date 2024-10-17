import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { ErrorEnum } from '../../types/enums'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' })
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser({ email, password })
        if (!user) {
            throw new UnauthorizedException(
                ErrorEnum.PASSWORD_OR_EMAIL_ARE_INCORRECT,
            )
        }
        return user
    }
}
