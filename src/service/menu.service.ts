import { Menu } from '@/entity/menu.entity'
import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { AuthorityService } from '@/service/authority.service'

@Injectable()
export class MenuService {
  constructor(
    @Inject('MENU_REPOSITORY') private readonly menuRepository: Repository<Menu>,
    private authorityService: AuthorityService
  ) {}

  async getMenu(uuid: string): Promise<any> {
    // 先根据uuid查roleId
    const roleId = await this.authorityService.getRoleIdByUUID(uuid)
    let menu
    if (roleId) {
      menu = await this.menuRepository
        .createQueryBuilder('menu')
        .leftJoinAndSelect('menu.meta', 'meta')
        .leftJoinAndSelect('menu.authorities', 'authority')
        .where('authority.id = :roleId', { roleId })
        .getMany()
    }
    const result = menu.reduce((prev, cur) => {
      const pid = cur.parentId
      const parent = menu.find(item => item.id === pid)
      if (parent) {
        // @ts-ignore
        parent.children ? parent.children.push(cur) : (parent.children = [cur])
      } else {
        // @ts-ignore
        cur.children = []
        prev.push(cur)
      }
      return prev
    }, [])
    return result
  }
}
