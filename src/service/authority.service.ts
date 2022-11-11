import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Authority } from '@/entity/authority.entity'

@Injectable()
export class AuthorityService {
  constructor(
    @Inject('AUTHORITY_REPOSITORY')
    private readonly authorityRepository: Repository<Authority>
  ) {}
  // 根据uuid获取roleId
  async getRoleIdByUUID(uuid: string): Promise<number> {
    const roleId = await this.authorityRepository
      .createQueryBuilder('authority')
      .leftJoinAndSelect('authority.users', 'user')
      .where('user.uuid = :uuid', { uuid })
      .getOne()
    return roleId.id
  }
}
