import {Controller, Get} from '@nestjs/common';
import {ApartmentData, ApartmentStatus, PurposeType} from "./apartment-data";


@Controller('apartments')
export class ApartmentsController {
    @Get('/')
   async showApartments() {
        const apartments: ApartmentData[] = [
            {
                name: 'Lokal U/0/1',
                size: 129.69,
                price: 1426590,
                floor: 0,
                purpose: PurposeType.gastronomy,
                status: ApartmentStatus.free,
                images: {
                    projection: 'images/rzut/U01.png',
                    floor: 'images/pietro/U01.png'
                }
            },
            {
                name: 'Lokal U/0/2',
                size: 259.26999999999998,
                price: 2851970,
                floor: 0,
                purpose: PurposeType.any,
                status: ApartmentStatus.booked,
                images: {
                    projection: 'images/rzut/U02.png',
                    floor: 'images/pietro/U02.png'
                }
            },
            {
                name: 'Lokal U/0/3',
                size: 88.569999999999993,
                price: 974270,
                floor: 0,
                purpose: PurposeType.any,
                status: ApartmentStatus.sold,
                images: {
                    projection: 'images/rzut/U03.png',
                    floor: 'images/pietro/U03.png'
                }
            },
            {
                name: 'Lokal U/0/4',
                size: 22.920000000000002,
                price: 275040,
                floor: 0,
                purpose: PurposeType.gastronomy,
                status: ApartmentStatus.free,
                images: {
                    projection: 'images/rzut/U04.png',
                    floor: 'images/pietro/U04.png'
                }
            },
            {
                name: 'Lokal U/0/5',
                size: 127.73,
                price: 1405030,
                floor: 0,
                purpose: PurposeType.any,
                status: ApartmentStatus.sold,
                images: {
                    projection: 'images/rzut/U05.png',
                    floor: 'images/pietro/U05.png'
                }
            },
        ]

        return apartments;
    }
}
