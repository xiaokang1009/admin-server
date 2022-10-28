import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter'
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter'
import { fastify } from 'fastify'

import { generateDocment } from './doc'
import { FastifyLogger } from './common/logger'
import { ValidationPipe } from '@nestjs/common'
import fastifyCookie from '@fastify/cookie'

async function bootstrap() {
  const fastifyInstance = fastify({
    logger: FastifyLogger
  })

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
  // 统一响应格式
  app.useGlobalInterceptors(new TransformInterceptor())

  // 启动全局字段校验
  app.useGlobalPipes(new ValidationPipe())

  generateDocment(app)

  // 异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter())

  await app.listen(8080)
}
bootstrap()
