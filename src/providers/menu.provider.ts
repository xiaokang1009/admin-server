import { DataSource } from 'typeorm'
import { Menu } from '@/entity/menu.entity'
import { Meta } from '@/entity/meta.entity'

export const menuProvider = [
  {
    provide: 'MENU_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Menu),
    inject: ['MYSQL_DATA_SOURCE']
  },
  {
    provide: 'META_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Meta),
    inject: ['MYSQL_DATA_SOURCE']
  }
]
