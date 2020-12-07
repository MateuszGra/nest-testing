import { Injectable } from '@nestjs/common';
import {ApartmentData, ApartmentStatus, PurposeType} from "../interface/apartment-data";
import {PostStatus} from "../interface/post-status";
import {PutStatus, StatusType} from "../interface/put-status";


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

    apartmentsSingle(id: string): ApartmentData[] | PostStatus{
        id = id.toUpperCase();
        let res: ApartmentData[] = this.apartments.filter(apartment => apartment.id.includes(id));
        if(res[0]) return res;
        else{
            const statusFalse: PostStatus = {
                isSuccess: false,
                errors: [`${id} not found`],
            }
            return statusFalse;
        }
    }

    apartmentPush(newApartment: ApartmentData): PostStatus {
        const status: PostStatus = this.postValidation(newApartment);
        if (status.isSuccess === true) this.apartments.push(newApartment);
        return status;
    }

    postValidation(newApartment: ApartmentData): PostStatus {
        const errors: string[] = [];

        if(!newApartment.name) errors.push('name is empty');
        else if(typeof newApartment.name !== 'string') errors.push('name is not string');
        else {
            let findByName  = this.apartments.find(apartment => apartment.name === newApartment.name);
            if(findByName) errors.push('name already exists');
        }

        if(!newApartment.id) errors.push('id is empty');
        else if(typeof newApartment.id !== 'string') errors.push('is is not string');
        else {
            let findById  = this.apartments.find(apartment => apartment.name === newApartment.name);
            if(findById) errors.push('id already exists');
        }

        if(!newApartment.size) errors.push('size is empty');
        else if(typeof newApartment.size !== 'number') errors.push('size is not number');

        if(!newApartment.price) errors.push('price is empty');
        else if(typeof newApartment.price !== 'number') errors.push('price is not number');

        if(!newApartment.floor) errors.push('floor is empty');
        else if(typeof newApartment.floor !== 'number') errors.push('floor is not number');

        if(!newApartment.purpose) errors.push('purpose is empty');
        else if(typeof newApartment.purpose !== 'string') errors.push('purpose is not string');

        if(!newApartment.status) errors.push('status is empty');
        else if(typeof newApartment.status !== 'string') errors.push('status is not string');

        if(!newApartment.images) errors.push('images is empty');
        else if(typeof newApartment.images !== 'object') errors.push('images is not object');
        else {
            if(!newApartment.images.projection) errors.push('projection is empty');
            else if(typeof newApartment.images.projection !== 'string') errors.push('images.projection is not string');
            if(!newApartment.images.floor) errors.push('floor is empty');
            else if(typeof newApartment.images.floor !== 'string') errors.push('images.floor is not string');
        }

        if(errors.length === 0) {
            const statusTrue: PostStatus = {
                isSuccess: true,
                index: this.apartments.length,
            }
            return statusTrue;

        } else {
            const statusFalse: PostStatus = {
                isSuccess: false,
                errors: errors,
            }
            return statusFalse;
        }

    }

    apartmentRemove(id: string): PostStatus {
        id = id.toUpperCase();
        const found  = this.apartments.find(apartment => apartment.id === id);
        const index = this.apartments.indexOf(found)

        if(found) {
            this.apartments.splice(index, 1);
            const statusTrue: PostStatus = {
                isSuccess: true,
                index: this.apartments.length,
            }
            return statusTrue;
        }
        else {
            const statusFalse: PostStatus = {
                isSuccess: false,
                errors: [`${id} not found`],
            }

            return statusFalse;
        }

    }

    apartmentPut(id: string, apartmentDataPart): PostStatus | PutStatus  {
        id = id.toUpperCase();
        let found: ApartmentData = this.apartments.find(apartment => apartment.id === id);
        const status: PutStatus = {};
        if(found) {
            const index: number = this.apartments.indexOf(found);
            for (const key in apartmentDataPart) {
                if(this.apartments[index][key]) {
                    if(key === 'id') apartmentDataPart.id = apartmentDataPart.id.toUpperCase()
                    this.apartments[index][key] = apartmentDataPart[key];
                    status[key] = StatusType.changed;
                } else {
                    status[key] = StatusType.notExist;
                }
            }

            return status;
        } else {
            const statusFalse: PostStatus = {
                isSuccess: false,
                errors: [`${id} not found`],
            }
        }
    }
}
