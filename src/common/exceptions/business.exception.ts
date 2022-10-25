import { HttpException, HttpStatus } from '@nestjs/common'
import { BUSINESS_ERROR_CODES } from './business.error.codes'

type BusinessError = {
  code: number
  message: string
}

export default class BusinessException extends HttpException {
  constructor(err: BusinessError | string) {
    if (typeof err === 'string') {
      err = {
        code: BUSINESS_ERROR_CODES.COMMON,
        message: err
      }
    }
    super(err, HttpStatus.OK)
  }

  static throwForbidden() {
    throw new BusinessException({
      code: BUSINESS_ERROR_CODES.ACCESS_FORBIDDEN,
      message: '抱歉啦，你无此权限！'
    })
  }
}
