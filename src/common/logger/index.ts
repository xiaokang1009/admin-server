import { join } from 'path'
import { fastLogger } from './logger'
const logOpt = {
  console: process.env.NODE_ENV !== 'production', // 是否开启console.log
  level: 'info',
  serializers: {
    // 需要的而外数据
    req: req => {
      return {
        method: req.method,
        url: req.url
      }
    }
  },
  fileName: join(process.cwd(), 'logs/nest-admins.log'), // 文件路径
  maxBufferLength: 4096, // 日志写入缓存队列最大长度
  flushInterval: 1000, // flush间隔
  logRotator: {
    byHour: true,
    byDay: false,
    hourDelimiter: '_'
  }
}

export const FastifyLogger = fastLogger(logOpt)
