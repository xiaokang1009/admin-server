import { DataSource } from 'typeorm'
import { Menu } from '@/entity/menu.entity'

export const menuProvider = [
  {
    provide: 'MENU_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Menu),
    inject: ['MYSQL_DATA_SOURCE']
  }
]
