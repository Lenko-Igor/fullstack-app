import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ErrorEnum } from '../../types/enums'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException(ErrorEnum.USER_NOT_AUTH)
    }
    return user
  }
}
