import {Body, Controller, Delete, Get, Inject, Param, Post, Put} from '@nestjs/common';
import {ApartmentsService} from "./apartments.service";
import {ApartmentDto} from "./dto/apartment-dto";
import {PostStatus} from "../interface/post-status";
import {ApartmentData} from "../interface/apartment-data";


@Controller('apartments')
export class ApartmentsController {

    constructor(
        @Inject(ApartmentsService) private apartmentsService: ApartmentsService,
    ) {
    }

    @Get('/')
    async showApartments(): Promise<ApartmentData[]> {
        return await this.apartmentsService.apartmentsAll();
    }

    @Post('/')
    async addApartment(
        @Body() newApartment: ApartmentDto,
    ): Promise<PostStatus> {
        return await this.apartmentsService.apartmentPush(newApartment);
    }

    @Get('/:id')
    async showSingleApartment(
        @Param('id') id: number,
    ): Promise<ApartmentData | PostStatus> {
        return await this.apartmentsService.apartmentsSingle(id);
    }

    @Delete('/:id')
    async removeApartment(
        @Param('id') id: number,
    ): Promise<PostStatus> {
        return await this.apartmentsService.apartmentRemove(id);
    }

    @Put('/:id')
    async editApartment(
        @Param('id') id: number,
        @Body() apartmentDataPart,
    ) {
        return await this.apartmentsService.apartmentPut(id, apartmentDataPart);
    }
}
