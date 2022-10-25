const path = require('path')
import { getConfig } from '../../utils'
import { DataSource, DataSourceOptions } from 'typeorm'

const databaseType: DataSourceOptions['type'] = 'mysql'

const { MYSQL_CONFIG } = getConfig()

const MYSQL_DATABASE_CONFIG = {
  ...MYSQL_CONFIG,
  type: databaseType,
  entities: [path.join(__dirname, `../../entity/*.entity{.ts,.js}`)],
  logging: true,
  logger: 'file'
}

const MYSQL_DATABASE_SOURCE = new DataSource(MYSQL_DATABASE_CONFIG)

// 数据库注入
export const DatabaseProviders = [
  {
    provide: 'MYSQL_DATA_SOURCE',
    useFactory: async () => {
      return MYSQL_DATABASE_SOURCE.initialize()
    }
  }
]
