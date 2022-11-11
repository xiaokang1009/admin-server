import { DatabaseLogger } from './databaseLogger'
/*
 * @Author: xiaokang1009
 * @Date: 2022-10-19 16:12:22
 * @LastEditors: xiaokang1009
 * @LastEditTime: 2022-11-14 19:28:39
 * @Description:
 */
import { Logger } from '@/utils/log4js'
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
  logger: new DatabaseLogger('all')
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
