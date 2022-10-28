import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { baseCreateTime } from '@/entity/base'
import { Menu } from '@/entity/menu.entity'
import { User } from '@/entity/user.entity'

@Entity()
export class Authority extends baseCreateTime {
  @PrimaryGeneratedColumn({ comment: '角色id' })
  id: number

  @Column({ comment: '角色名' })
  authorityName: string

  @Column({ comment: '父角色ID' })
  parentId: number

  @ManyToMany(() => Menu, menu => menu.authorities, {
    cascade: true
  })
  @JoinTable()
  menus: Menu[]

  @ManyToMany(() => User, user => user.authorities, {
    cascade: true
  })
  @JoinTable()
  users: User[]

  @Column({ comment: '默认路由', default: 'dashboard' })
  defaultRouter: string
}
