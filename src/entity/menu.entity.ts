import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Meta } from '@/entity/meta.entity'
import { baseCreateTime } from '@/entity/base'
import { Authority } from '@/entity/authority.entity'

/**
 * 菜单
 */

@Entity()
export class Menu extends baseCreateTime {
  @PrimaryGeneratedColumn({ comment: '菜单id' })
  id: number

  @Column('int', { nullable: true })
  parentId: number // 父字段的id

  @Column('varchar', { comment: '前端路由路径' })
  component: string

  @Column('boolean', { comment: '是否在列表隐藏', default: false })
  hidden: boolean

  @Column('varchar', { comment: '前端路由name' })
  name: string

  @Column('varchar', { comment: '前端路由path' })
  path: string

  @Column('int', { comment: '排序标记', default: 0 })
  sort: number

  @OneToOne(() => Meta, meta => meta.menu, {
    cascade: true
  })
  @JoinColumn()
  meta: Meta

  @ManyToMany(() => Authority, authority => authority.menus)
  authorities: Authority[]

  @Column({ comment: '菜单等级', default: 0 })
  menuLevel: number
}
