import { Configuration } from 'log4js'
import * as path from 'path'

const baseLogPath = path.resolve(__dirname, '../../logs')

const log4jsConfig: Configuration = {
  appenders: {
    console: {
      type: 'console'
    },
    access: {
      type: 'dateFile',
      filename: `${baseLogPath}/access/access.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyyMMdd', // 日志文件按日期（天）切割
      daysToKeep: 60,
      numBackups: 3,
      category: 'http',
      keepFileExists: true
    },
    app: {
      type: 'dateFile',
      filename: `${baseLogPath}/app-out/app.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
      },
      pattern: 'yyyyMMdd', // 日志文件按日期（天）切割
      daysToKeep: 60,
      numBackups: 3,
      keepFileExists: true
    },
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/errors/error.log`,
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '{"date":"%d","level":"%p","category":"%c","host":"%h","pid":"%z","data":\'%m\'}'
      },
      pattern: 'yyyyMMdd', // 日志文件按日期（天）切割
      daysToKeep: 60,
      numBackups: 3,
      keepFileExists: true
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile'
    }
  },
  categories: {
    default: {
      appenders: ['console', 'app', 'errors'],
      level: 'ERROR'
    },
    info: { appenders: ['console', 'app', 'errors'], level: 'info' },
    access: { appenders: ['console', 'app', 'errors'], level: 'info' },
    http: { appenders: ['access'], level: 'DEBUG' }
  },
  pm2: true, // 使用 pm2 来管理项目时，打开
  pm2InstanceVar: 'INSTANCE_ID' // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
}

export default log4jsConfig
