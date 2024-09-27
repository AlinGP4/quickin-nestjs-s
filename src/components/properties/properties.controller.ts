import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { DeletePropertyDto, EditPropertyDto, GetProertyByOwnerDto, NewPropertyDto } from 'src/core/propertie.dto';
import { PropertiesService } from './properties.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Properies')
@Controller('properties')
export class PropertiesController {
    constructor(
        private propertiesService: PropertiesService
    ) {

    }

    @Get('all')
    async getAll(): Promise<any> {
        return await this.propertiesService.getAll()
    }

    @Get('byId')
    getDataById(): any {
    }

    @Get('byOwner')
    async getDataByOwner(@Query() param: GetProertyByOwnerDto): Promise<any> {
        return await this.propertiesService.getDataByOwner(param.dni)
    }

    @Post('new')
    @ApiBody({ type: NewPropertyDto })
    async addProperties(@Body() newPropertyDto: NewPropertyDto): Promise<any> {
        return await this.propertiesService.addProperties(newPropertyDto);
    }

    @Put('update')
    async updateDataPropertie(@Body() editPropertyDto: EditPropertyDto): Promise<any> {
        return await this.propertiesService.updateDataPropertie(editPropertyDto);
    }

    @Delete('delete')
    async deleteProperties(@Query() deletePropertyDto: DeletePropertyDto): Promise<any> {
        return await this.propertiesService.deleteProperties(deletePropertyDto);
    }
}
