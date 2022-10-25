import { regUserName } from '@/utils/regex'
import { IsNotEmpty, Matches, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterDTO {
  @ApiProperty({
    description: '用户名',
    example: 'condingkang'
  })
  @Matches(regUserName, { message: '请输入正确的用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  @IsString({ message: '名字必须是String类型' })
  readonly username: string

  @ApiProperty({
    description: '用户密码',
    example: '123456'
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string

  @ApiProperty({
    description: '二次输入密码',
    example: '123456'
  })
  @IsNotEmpty({ message: '请再次输入密码' })
  readonly passwordRepeat: string
}
