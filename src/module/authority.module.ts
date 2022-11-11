import { Module } from '@nestjs/common'
import { DatabaseModule } from '@/common/database/database.module'
import { AuthorityProvider } from '@/providers/authority.provider'
import { AuthorityService } from '@/service/authority.service'

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [...AuthorityProvider, AuthorityService],
  exports: []
})
export class AuthorityModule {}
