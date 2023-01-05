import { ApiProperty } from '@nestjs/swagger'
import { MenuInfo } from '@/dto/menu'
import { User } from '@/entity/user.entity'
import { Menu } from '@/entity/menu.entity'
import { Api } from '@/entity/api.entity'

export class AuthorityInfo {
  @ApiProperty({ description: '角色id', example: 1 })
  id: number

  @ApiProperty({ description: '角色名', example: '普通用户' })
  authorityName: string

  @ApiProperty({ description: '默认路由', example: 'dashboard' })
  defaultRouter: string

  @ApiProperty({ description: '菜单', example: MenuInfo })
  menus: Menu

  @ApiProperty({ description: '用户', example: {} })
  users: User

  @ApiProperty({ description: 'api请求', example: {} })
  apis: Api
}
