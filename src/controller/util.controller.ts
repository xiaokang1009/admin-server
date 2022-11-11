/**
 * 转发到请求远程资源并响应给前端
 */
import { Controller, Get } from '@nestjs/common'
import { Public } from '@/common/auth/constants'
import { ApiTags } from '@nestjs/swagger'
import { HttpService } from '@nestjs/axios'

@ApiTags('中转站')
@Controller('util')
@Public()
export class UtilController {
  constructor(private readonly httpService: HttpService) {}
}
