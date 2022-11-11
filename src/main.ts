import { UserService } from '@/service/user.service'
/*
 * @Author: xiaokang1009
 * @Date: 2022-10-28 15:49:49
 * @LastEditors: xiaokang1009
 * @LastEditTime: 2022-11-14 19:39:23
 * @Description: 主方法
 */
import { NestFactory } from '@nestjs/core'
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import {
  RequestInterceptor,
  ResponseInterceptor
} from './common/interceptors/transform.interceptor'
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter'
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter'

import { generateDocment } from './doc'
import { ValidationPipe } from '@nestjs/common'
import fastifyCookie from '@fastify/cookie'
import { logger } from './common/middleware/logger.middleware'
import { fastify } from 'fastify'

async function bootstrap() {
  const fastifyInstance = fastify()

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
    {
      cors: {
        origin: 'http://localhost:8000',
        credentials: true
      }
    }
  )
  app.register(fastifyCookie, {
    secret: 'my-secret'
  })
  app.use(logger)
  // 统一响应格式
  const reflector = app.get<UserService>(UserService)
  app.useGlobalInterceptors(new ResponseInterceptor(), new RequestInterceptor(reflector))

  // 启动全局字段校验
  app.useGlobalPipes(new ValidationPipe())

  generateDocment(app)

  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter())

  await app.listen(8080)
}
bootstrap()
