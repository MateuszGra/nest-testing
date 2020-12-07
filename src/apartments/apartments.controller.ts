import {Body, Controller, Delete, Get, Inject, Param, Post} from '@nestjs/common';
import {ApartmentsService} from "./apartments.service";
import {ApartmentDto} from "./dto/apartment-dto";
import {postStatus} from "../interface/post-status";
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

    @Get('/:id')
    async showSingleApartment(
        @Param('id') id: string,
    ): Promise<ApartmentData> {
        return this.apartmentsService.apartmentsSingle(id);
    }

    @Post('/')
    async addApartment(
        @Body() newApartment: ApartmentDto,
    ): Promise<postStatus> {
        return this.apartmentsService.apartmentPush(newApartment);
    }

    @Delete('/:id')
    async removeApartment(
        @Param('id') id: string,
    ): Promise<postStatus> {
        return this.apartmentsService.apartmentRemove(id);
    }
}
