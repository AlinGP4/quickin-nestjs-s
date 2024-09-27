import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContratsService } from './contrats.service';
import { DeleteContractDto, GetContractsByDNIDto, NewContractDto, SingContractDto } from 'src/core/contrats.dto';

@ApiTags('Contrats')
@Controller('contrats')
export class ContratsController {
    constructor(
        private ContratsService: ContratsService
    ) {

    }

    @Get('byDNI')
    async getContrats(@Query() getContractsByDNIDto: GetContractsByDNIDto): Promise<any> {
        return await this.ContratsService.getContrats(getContractsByDNIDto)
    }

    @Post('new')
    async addContrats(@Body() newContractDto: NewContractDto): Promise<any> {
        return await this.ContratsService.addContrats(newContractDto)
    }

    @Delete('delete')
    async deleteContrats(@Query() deleteContractDto: DeleteContractDto): Promise<any> {
        return await this.ContratsService.deleteContrats(deleteContractDto)
    }


    @Put('sign')
    async signDataContrat(@Body() singContractDto: SingContractDto): Promise<any> {
        return await this.ContratsService.signContract(singContractDto);
    }
}
