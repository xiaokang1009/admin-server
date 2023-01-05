import { FastifyRequest, FastifyReply } from 'fastify'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import BusinessException from './business.exception'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    const request = ctx.getRequest<FastifyRequest>()
    const status = exception.getStatus()

    if (exception instanceof BusinessException) {
      const error = exception.getResponse()
      response.status(HttpStatus.OK).send({
        data: null,
        status: error['code'],
        msg: error['message'],
        success: false,
        code: error['code']
      })
      return
    }

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      code: status,
      msg: exception.message
    })
  }
}
