/*
 * @Author: xiaokang1009
 * @Date: 2022-10-18 11:33:18
 * @LastEditors: xiaokang1009
 * @LastEditTime: 2022-11-14 19:55:03
 * @Description:
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { Logger } from '@/utils/log4js'
import { UserService } from '@/service/user.service'
interface Response<T> {
  data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => ({
        data,
        status: 0,
        msg: '请求成功',
        code: 0,
        success: true
      }))
    )
  }
}

@Injectable()
export class RequestInterceptor<T> implements NestInterceptor {
  constructor(private readonly userService: UserService) {}
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const req = ctx.getArgByIndex(0)
    return next.handle().pipe(
      map(data => {
        const logFormat = `Request origin url: ${req.originalUrl}
          Method: ${req.method}
          IP: ${req.ip}
          User: ${JSON.stringify(req.user)}
          Response data: \n ${JSON.stringify(data.data)}`
        Logger.info(logFormat).access(logFormat)
      })
    )
  }
}
