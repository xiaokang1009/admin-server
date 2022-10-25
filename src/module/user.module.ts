import { jwtConstants } from '@/common/auth/constants'
import { DatabaseModule } from '@/common/database/database.module'
import { UserService } from '@/service/user.service'

import { Module } from '@nestjs/common'
import { UserController } from '@/controller/user.controller'
import { userProvider } from '@/providers/user.provider'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '@/common/auth/jwt.strategy'

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn // token 过期时效
      }
    })
  ],
  controllers: [UserController],
  providers: [...userProvider, UserService, JwtStrategy],
  exports: [UserService]
})
export class UserModule {}
