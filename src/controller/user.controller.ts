import { FastifyReply } from 'fastify'
import { TokenResponse } from '@/dto/user/token.vo'
import { UserInfoResponse } from '@/dto/user/user-info.vo'
import { RegisterDTO } from '@/dto/user/register.dto'
import { UserService } from '@/service/user.service'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { LoginDTO } from '@/dto/user/login.dto'
import { Public } from '@/common/auth/constants'

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({ type: RegisterDTO })
  @Public()
  @ApiOkResponse({ description: '注册', type: UserInfoResponse })
  @Post('register')
  async register(
    @Body() registerDTO: RegisterDTO,
    @Res({ passthrough: true }) response: FastifyReply
  ): Promise<TokenResponse> {
    const access_token = await this.userService.register(registerDTO)
    response.setCookie('jwt', access_token, {
      path: '/'
    })
    return access_token
  }

  @ApiBody({ type: LoginDTO })
  @Public()
  @ApiOkResponse({ description: '登录', type: TokenResponse })
  @Post('login')
  async login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: FastifyReply
  ): Promise<TokenResponse> {
    const access_token = await this.userService.login(loginDTO)
    response.setCookie('jwt', access_token.info, {
      path: '/'
    })
    return access_token
  }
}
