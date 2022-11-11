import { FastifyReply } from 'fastify'
import { TokenResponse, UserInfoResponse, RegisterDTO, LoginDTO } from '@/dto/user'
import { UserService } from '@/service/user.service'
import { Body, Controller, Post, Res } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
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
  ): Promise<UserInfoResponse> {
    const access_token = await this.userService.register(registerDTO)
    response.setCookie('jwt', access_token, {
      path: '/'
    })
    return access_token.user
  }

  @ApiBody({ type: LoginDTO })
  @Public()
  @ApiOkResponse({ description: '登录', type: TokenResponse })
  @Post('login')
  async login(
    @Body() loginDTO: LoginDTO,
    @Res({ passthrough: true }) response: FastifyReply
  ): Promise<UserInfoResponse> {
    const access_token = await this.userService.login(loginDTO)
    response.setCookie('jwt', access_token.info, {
      path: '/'
    })
    return access_token.user
  }
}
