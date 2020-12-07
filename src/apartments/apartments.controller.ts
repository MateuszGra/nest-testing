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
        return this.apartmentsService.apartmentsAll();
    }

    @Post('/')
    async addApartment(
        @Body() newApartment: ApartmentDto,
    ): Promise<PostStatus> {
        return this.apartmentsService.apartmentPush(newApartment);
    }

    @Get('/:id')
    async showSingleApartment(
        @Param('id') id: string,
    ): Promise<ApartmentData[] | PostStatus> {
        return this.apartmentsService.apartmentsSingle(id);
    }

    @Delete('/:id')
    async removeApartment(
        @Param('id') id: string,
    ): Promise<PostStatus> {
        return this.apartmentsService.apartmentRemove(id);
    }

    @Put('/:id')
    async editApartment(
        @Param('id') id: string,
        @Body() apartmentDataPart,
    ) {
        return this.apartmentsService.apartmentPut(id, apartmentDataPart);
    }
}
