import { regUserName } from '@/utils/regex'
import { IsNotEmpty, Matches, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Authority } from '@/entity/authority.entity'
import { AuthorityInfo } from '@/dto/authority'

export class LoginDTO {
  @ApiProperty({ description: '用户名，唯一', example: 'condingkang' })
  @Matches(regUserName, { message: '请输入正确的用户名' })
  @IsNotEmpty({ message: '请输入用户名' })
  readonly username: string

  @ApiProperty({ description: '用户密码', example: '123456' })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string
}

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
export class TokenItem {
  @ApiProperty({ description: 'token', example: 'sdfghjkldasascvbnm' })
  token: string
}

export class TokenVO {
  @ApiProperty({ type: TokenItem })
  info: TokenItem
}

export class TokenResponse {
  @ApiProperty({ description: '状态码', example: 0 })
  status: number

  @ApiProperty({ description: '数据', type: () => TokenVO, example: TokenVO })
  data: TokenVO

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string
}

export class UserInfoItem {
  @ApiProperty({ description: '用户id', example: 1 })
  id: number

  @ApiProperty({ description: '用户uuid' })
  uuid: string

  @ApiProperty({ description: '创建时间', example: '2022-10-19' })
  createTime: Date

  @ApiProperty({ description: '更新时间', example: '2022-10-19' })
  updateTime: Date

  @ApiProperty({ description: '用户名', example: 'condingkang' })
  username: string

  @ApiProperty({ description: '角色', example: AuthorityInfo })
  authority: Authority
}

export class UserInfoVO {
  @ApiProperty({ type: UserInfoItem })
  info: UserInfoItem
}

export class UserInfoResponse {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number

  @ApiProperty({ description: '数据', type: () => UserInfoVO, example: UserInfoVO })
  data: UserInfoVO

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string
}
