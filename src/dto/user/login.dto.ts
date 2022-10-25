import { regUserName } from '@/utils/regex'
import { IsNotEmpty, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDTO {
  @ApiProperty({ description: '用户名，唯一', example: 'condingkang' })
  @Matches(regUserName, { message: '请输入正确的用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string

  @ApiProperty({ description: '用户密码', example: '123456' })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string
}
