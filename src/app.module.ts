/*
 * @Author: xiaokang1009
 * @Date: 2022-10-28 15:49:49
 * @LastEditors: xiaokang1009
 * @LastEditTime: 2022-11-15 10:40:55
 * @Description: 主modules
 */
import { UserModule } from './module/user.module'
import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { getConfig } from './utils'
import * as redisStore from 'cache-manager-redis-store'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from '@/common/auth/jwt-auth.guard'
import { MenuModule } from '@/module/menu.module'
import { UtilController } from '@/controller/util.controller'
import { HttpModule } from '@nestjs/axios'

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: getConfig('REDIS_CONFIG').host,
      port: getConfig('REDIS_CONFIG').port,
      auth_pass: getConfig('REDIS_CONFIG').auth,
      db: getConfig('REDIS_CONFIG').db
    }),
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [getConfig]
    }),
    HttpModule,
    UserModule,
    MenuModule
  ],
  controllers: [UtilController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
