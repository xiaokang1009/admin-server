import { SetMetadata } from '@nestjs/common'

export const jwtConstants = {
  secret: 'conding-kang-yyds', // 秘钥
  expiresIn: '24h', // 时效时长
  ignoreExpiration: false //是否忽略 token时效
}

export const IS_PUBLIC_KEY = 'isPublic'

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)
