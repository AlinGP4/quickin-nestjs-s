import { Module } from '@nestjs/common';
import { AdController } from './ad/ad.controller';
import { AdService } from './ad/ad.service';

@Module({
  controllers: [AdController],
  providers: [AdService]
})
export class DashboardModule {}
