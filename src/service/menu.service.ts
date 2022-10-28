import { Menu } from '@/entity/menu.entity'
import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Meta } from '@/entity/meta.entity'

@Injectable()
export class MenuService {
  constructor(@Inject('MENU_REPOSITORY') private readonly menuRepository: Repository<Menu>) {}

  async getMenu(): Promise<any> {
    const menu = await this.menuRepository
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.meta', 'meta')
      .leftJoinAndSelect('menu.authorities', 'authority')
      .getMany()
    console.log(menu)
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
