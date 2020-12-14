import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ApartmentsService} from "./apartments.service";
import {RespStatus} from "../interface/resp-status";
import {ApartmentsEntity} from "./apartments.entity";


@Controller('apartments')
export class ApartmentsController {

    constructor(
        @Inject(ApartmentsService) private apartmentsService: ApartmentsService,
    ) {
    }

    @Get('/')
    async showApartments(): Promise<RespStatus> {
        return await this.apartmentsService.apartmentsAll();
    }

    @Post('/')
    async addApartment(
        @Body() newApartment: ApartmentsEntity,
    ): Promise<RespStatus> {
        return await this.apartmentsService.apartmentPush(newApartment);
    }

    @Get('/search/name/:searchTerm')
    async findName(
        @Param('searchTerm') searchTerm: string
    ): Promise<RespStatus> {
        return await this.apartmentsService.searchName(searchTerm);
    }

    @Get('/page/:page')
    async pagination(
        @Param('page') page: string
    ): Promise<RespStatus> {
        return await this.apartmentsService.apartmentsPage(Number(page));
    }

    @Get('/:id')
    async showSingleApartment(
        @Param('id') id: string,
    ): Promise<RespStatus> {
        return await this.apartmentsService.apartmentsSingle(Number(id));
    }

    @Delete('/:id')
    async removeApartment(
        @Param('id') id: string,
    ): Promise<RespStatus> {
        return await this.apartmentsService.apartmentRemove(Number(id));
    }

    @Put('/:id')
    async editApartment(
        @Param('id') id: string,
        @Body() apartmentDataPart,
    ): Promise<RespStatus> {
        return await this.apartmentsService.apartmentPut(Number(id), apartmentDataPart);
    }
}
