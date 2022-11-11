import { DataSource } from 'typeorm'
import { Authority } from '@/entity/authority.entity'

export const AuthorityProvider = [
  {
    provide: 'AUTHORITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Authority),
    inject: ['MYSQL_DATA_SOURCE']
  }
]
