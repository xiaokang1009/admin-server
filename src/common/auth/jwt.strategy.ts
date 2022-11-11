import { FastifyRequest } from 'fastify'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { jwtConstants } from '@/common/auth/constants'

const cookieExtractor = (req: FastifyRequest) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['jwt']
  }
  return token
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: jwtConstants.ignoreExpiration,
      secretOrKey: jwtConstants.secret
    })
  }

  async validate(payload: Payload): Promise<Payload> {
    return {
      id: payload.id,
      uuid: payload.uuid,
      username: payload.username
    }
  }
}
