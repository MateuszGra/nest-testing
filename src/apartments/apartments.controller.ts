import {Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import {ApartmentsService} from "./apartments.service";
import {ApartmentDto} from "./dto/apartment-dto";


@Controller('apartments')
export class ApartmentsController {

    constructor(
        @Inject(ApartmentsService) private apartmentsService: ApartmentsService,
    ) {
    }

    @Get('/')
    async showApartments() {
        return this.apartmentsService.apartmentsAll();
    }

    @Get('/:id')
    async showSingleApartment(
        @Param('id') id: string,
    ) {
        return this.apartmentsService.apartmentsSingle(id);
    }

    @Post('/')
    async addApartment(
        @Body() newApartment: ApartmentDto,
    ) {
        this.apartmentsService.apartments.push(newApartment);
        return this.apartmentsService.apartmentsAll();
    }

}
