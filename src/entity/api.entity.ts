import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { baseCreateTime } from '@/entity/base'
import { Authority } from '@/entity/authority.entity'

/**
 * api表
 */
@Entity()
export class Api extends baseCreateTime {
  @PrimaryGeneratedColumn({ comment: '权限id' })
  id: number

  @ManyToMany(() => Authority, authority => authority.apis)
  authorities: Authority

  @Column({ comment: 'api组' })
  apiGroup: string

  @Column({ comment: 'api请求方法' })
  method: string

  @Column({ comment: '请求路径' })
  path: string

  @Column({ comment: '描述' })
  description: string
}
