import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from './constants'
import { Observable } from 'rxjs'
import BusinessException from '@/common/exceptions/business.exception'
import { BUSINESS_ERROR_CODES } from '@/common/exceptions/business.error.codes'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const loginAuth = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    if (loginAuth) {
      return true
    }
    return super.canActivate(context)
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw (
        err ||
        new BusinessException({
          code: BUSINESS_ERROR_CODES.TOKEN_INVALID,
          message: 'token 已失效'
        })
      )
    }
    console.log('user', user)
    return user
  }
}
