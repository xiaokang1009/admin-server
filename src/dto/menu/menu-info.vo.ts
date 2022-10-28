import { ApiProperty } from '@nestjs/swagger'
import dayjs from 'dayjs'
import { Menu } from '@/entity/menu.entity'
import { User } from '@/entity/user.entity'
import { UserInfoItem } from '@/dto/user/user-info.vo'
import { Authority } from '@/entity/authority.entity'

class MetaInfo {
  @ApiProperty({ description: '是否缓存', example: true })
  keepAlive: boolean

  @ApiProperty({ description: '是否是基础路由', example: false })
  defaultMenu: boolean

  @ApiProperty({ description: '菜单名', example: '首页' })
  title: string

  @ApiProperty({ description: '菜单图标', example: 'dashboard' })
  icon: string

  @ApiProperty({ description: '自动关闭tab', example: true })
  closeTab: boolean
}

export class MenuInfo {
  @ApiProperty({ description: '用户id', example: 1 })
  id: number

  @ApiProperty({ description: '创建时间', example: '2022-10-15 10:00:00' })
  createAt: Date

  @ApiProperty({ description: '更新时间', example: '2022-10-15 10:00:00' })
  UpdateAt: Date

  @ApiProperty({ description: '前端组件路径文件.', example: 'view/dashboard/index.vue' })
  component: string

  @ApiProperty({ description: '是否在列表隐藏', example: false })
  hidden: boolean

  @ApiProperty({ description: '附加属性', example: MetaInfo })
  meta: MetaInfo

  @ApiProperty({ description: '排序标记', example: 0 })
  sort: number

  @ApiProperty({ description: '父菜单id', example: 0 })
  parentId: number

  @ApiProperty({ description: '子菜单', example: MenuInfo })
  children: MenuInfo

  @ApiProperty({ description: '前端路由path', example: '/dashboard' })
  path: string

  @ApiProperty({ description: '前端路由name', example: 'dashboard' })
  name: string

  authories: Authority
}

export class MenuRespose {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number

  @ApiProperty({ description: '数据', type: () => MenuInfo, example: MenuInfo })
  data: MenuInfo

  @ApiProperty({ description: '请求结果信息', example: '请求成功' })
  message: string
}
