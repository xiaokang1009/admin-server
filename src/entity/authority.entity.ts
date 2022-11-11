import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { baseCreateTime } from '@/entity/base'
import { Menu } from '@/entity/menu.entity'
import { User } from '@/entity/user.entity'
import { Api } from '@/entity/api.entity'

/**
 * 角色表
 */

@Entity()
export class Authority extends baseCreateTime {
  @PrimaryGeneratedColumn({ comment: '角色id' })
  id: number

  @Column({ comment: '角色名' })
  authorityName: string

  @Column({ comment: '父角色ID', nullable: true })
  parentId: number

  @ManyToMany(() => Menu, menu => menu.authorities, {
    cascade: true
  })
  @JoinTable()
  menus: Menu[]

  @ManyToMany(() => User, user => user.authorities, {
    cascade: true
  })
  users: User[]

  @Column({ comment: '默认路由', default: 'dashboard' })
  defaultRouter: string

  @ManyToMany(() => Api, api => api.authorities)
  @JoinTable()
  apis: Api
}
