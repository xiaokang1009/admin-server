import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/common/database/database.module'
import { menuProvider } from '@/providers/menu.provider'
import { MenuService } from '@/service/menu.service'
import { MenuController } from '@/controller/menu.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [MenuController],
  providers: [...menuProvider, MenuService],
  exports: []
})
export class MenuModule {}
