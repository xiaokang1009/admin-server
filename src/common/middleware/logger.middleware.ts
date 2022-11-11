/*
 * @Author: xiaokang1009
 * @Date: 2022-11-14 16:58:13
 * @LastEditors: xiaokang1009
 * @LastEditTime: 2022-11-14 19:46:19
 * @Description:
 */
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Logger } from '@/utils/log4js'
import { FastifyRequest, FastifyReply } from 'fastify'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const code = res.statusCode
    next()
    const logFormat = `Method: ${req.method} \n Request origin url: ${req.routerPath} \n IP: ${req.ip} \n Status code: ${code} \n`

    if (code >= 500) {
      Logger.error(logFormat)
    } else if (code >= 400) {
      Logger.warn(logFormat)
    } else {
      Logger.access(logFormat)
      Logger.log(logFormat)
    }
  }
}

// 函数中间件
export const logger = (req: FastifyRequest, res: FastifyReply, next: () => void) => {
  const code = res.statusCode
  next()

  const logFormat = `Request origin url: ${req.url}
  Method: ${req.method}
  IP: ${req.ip}
  Status code: ${code}
  Params:${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Body: ${JSON.stringify(req.body)} \n`

  if (code >= 500) {
    Logger.error(logFormat)
  } else if (code >= 400) {
    Logger.warn(logFormat)
  } else {
    Logger.access(logFormat)
    Logger.log(logFormat)
  }
}
