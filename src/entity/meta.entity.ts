import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Menu } from '@/entity/menu.entity'

@Entity()
export class Meta {
  @PrimaryGeneratedColumn({ comment: 'meta id' })
  id: number

  @Column({ comment: '自动关闭tab', default: false })
  closeTab: boolean

  @Column({ comment: '是否是基础路由', default: false })
  defaultMenu: boolean

  @Column({ comment: '菜单图标' })
  icon: string

  @Column({ comment: '是否缓存', default: false })
  keepAlive: boolean

  @Column({ comment: '菜单名' })
  title: string

  @OneToOne(() => Menu, menu => menu.meta)
  menu: Menu
}
