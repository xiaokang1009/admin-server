import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/common/database/database.module'
import { menuProvider } from '@/providers/menu.provider'
import { MenuService } from '@/service/menu.service'
import { MenuController } from '@/controller/menu.controller'
import { AuthorityService } from '@/service/authority.service'
import { AuthorityProvider } from '@/providers/authority.provider'

@Module({
  imports: [DatabaseModule],
  controllers: [MenuController],
  providers: [...menuProvider, MenuService, ...AuthorityProvider, AuthorityService],
  exports: []
})
export class MenuModule {}
