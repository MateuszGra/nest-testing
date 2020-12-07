import { Injectable } from '@nestjs/common';
import {ApartmentData, ApartmentStatus, PurposeType} from "../interface/apartment-data";

@Injectable()
export class ApartmentsService {
    apartments: ApartmentData[];

    constructor() {
        this.apartments = [
            {
                name: 'Lokal U/0/1',
                id: 'U01',
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
                id: 'U02',
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
                id: 'U03',
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
                id: 'U04',
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
                id: 'U05',
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
    }

    apartmentsAll(): ApartmentData[] {
        return this.apartments;
    }

    apartmentsSingle(id: string): ApartmentData {
        id = id.toUpperCase();
        let res = this.apartments.filter(apartment => apartment.id.includes(id));
        if(res.length !== 0) return res[0];
    }
}
