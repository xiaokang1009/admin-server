import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { MenuService } from '@/service/menu.service'
import { MenuRespose } from '@/dto/menu/menu-info.vo'
import { Public } from '@/common/auth/constants'

@ApiTags('菜单模块')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @ApiOkResponse({ description: '获取所有菜单', type: MenuRespose })
  @Get('getMenu')
  async getMenu(): Promise<MenuRespose> {
    const menu = this.menuService.getMenu()
    return menu
  }
}
