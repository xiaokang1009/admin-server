import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  VersionColumn
} from 'typeorm'
import { baseCreateTime } from '@/entity/base'
import { Authority } from '@/entity/authority.entity'

/**
 * 用户
 */

@Entity()
export class User extends baseCreateTime {
  // 主键id
  @PrimaryGeneratedColumn({ comment: '用户id' })
  id: number
  // uuid
  @PrimaryGeneratedColumn('uuid', { comment: '用户uuid' })
  uuid: string

  // 软删除
  @Column({ default: false, comment: '软删除' })
  isDelete: boolean

  // 更新次数
  @VersionColumn({ comment: '更新次数' })
  version: number

  // 用户名
  @Column('text', { comment: '用户名' })
  username: string

  // 昵称
  @Column('text', { nullable: true, comment: '昵称' })
  nickname: string

  // 手机号
  @Column('text', { nullable: true, comment: '手机号码' })
  mobile: string

  // 加密后的密码
  @Column('text', { select: false, comment: '加密后的密码' })
  password: string

  // 加密盐
  @Column('text', { select: false, comment: '加密盐' })
  salt: string

  @ManyToMany(() => Authority, authority => authority.users)
  @JoinTable()
  authorities: Authority[]
}
