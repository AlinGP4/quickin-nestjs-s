import { Controller, Get, Post, Query } from '@nestjs/common';
import { AdService } from './ad.service';
import { NewAdDto } from 'src/core/ad.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('ad')
export class AdController {
    constructor(
        private adService: AdService
    ) {

    }

    @Get()
    getAdLink() {
        return this.adService.getAdLink();
    }

    @Post()
    adLink(@Query() query: NewAdDto) {
        return this.adService.adLink(query.ref);
    }
}
