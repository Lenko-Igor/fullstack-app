import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { WARNING_MESSAGES } from '../../utiles/constants'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }

    handleRequest(err, user) {
        if (err || !user) {
            throw (
                err || new UnauthorizedException(WARNING_MESSAGES.USER_NOT_AUTH)
            )
        }
        return user
    }
}
