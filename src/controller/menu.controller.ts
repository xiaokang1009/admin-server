import { Body, Controller, Get, Req } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { MenuService } from '@/service/menu.service'
import { MenuRespose } from '@/dto/menu'
import { FastifyRequest } from 'fastify'

@ApiTags('菜单模块')
@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @ApiOkResponse({ description: '获取所有菜单', type: MenuRespose })
  @Get('getMenu')
  async getMenu(@Req() req: FastifyRequest): Promise<any> {
    const uuid = req.headers['x-uuid'] as string
    const menu = this.menuService.getMenu(uuid)
    return menu
  }
}
