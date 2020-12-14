import { Injectable } from '@nestjs/common';
import {ApartmentData} from "../interface/apartment-data";
import {PostStatus} from "../interface/post-status";
import {ApartmentsEntity} from "./apartments.entity";


@Injectable()
export class ApartmentsService {
    apartments: ApartmentData[];

    async apartmentsAll(): Promise<ApartmentData[]> {
        return await ApartmentsEntity.find();
    }

    async apartmentsPage(currentPage: number = 1): Promise<ApartmentData[]> {
        const maxPerPage = 3;

        const [items, count] = await ApartmentsEntity.findAndCount({
            skip: maxPerPage * (currentPage - 1),
            take: maxPerPage,
        })

        const pagesCount = Math.ceil(count / maxPerPage);

        return items;

    }

    async apartmentsSingle(id: number): Promise<ApartmentData | PostStatus>{
        let res: ApartmentData = await ApartmentsEntity.findOne(id);
        if(res) return res;
        else{
            const statusFalse: PostStatus = {
                isSuccess: false,
                errors: [`${id} not found`],
            }
            return statusFalse;
        }
    }

    async apartmentPush(newApartment: ApartmentsEntity): Promise<PostStatus> {
        const status: PostStatus = await this.postValidation(newApartment);
        if (status.isSuccess === true) {
            const add: ApartmentData = await ApartmentsEntity.save(newApartment);
            status.id = Number(add.id);
        }
        return status;
    }

    async postValidation(newApartment: ApartmentData): Promise<PostStatus> {
        const errors: string[] = [];

        if(!newApartment.name) errors.push('name is empty');
        else if(typeof newApartment.name !== 'string') errors.push('name is not string');
        else {
            let findByName: ApartmentData  = await ApartmentsEntity.findOne({name: newApartment.name});
            if(findByName) errors.push('name already exists');
        }

        if(newApartment.id && typeof newApartment.id !== 'number') errors.push('id is not number');
        else if(newApartment.id !== undefined){
            let findById: ApartmentData = await ApartmentsEntity.findOne(newApartment.id);
            if(findById) errors.push('id already exists');
        }

        if(!newApartment.size) errors.push('size is empty');
        else if(typeof newApartment.size !== 'number') errors.push('size is not number');

        if(!newApartment.price) errors.push('price is empty');
        else if(typeof newApartment.price !== 'number') errors.push('price is not number');

        if(newApartment.floor === undefined) errors.push('floor is empty');
        else if(typeof newApartment.floor !== 'number') errors.push('floor is not number');

        if(!newApartment.purpose) errors.push('purpose is empty');
        else if(typeof newApartment.purpose !== 'string') errors.push('purpose is not string');

        if(!newApartment.status) errors.push('status is empty');
        else if(typeof newApartment.status !== 'string') errors.push('status is not string');

        if(!newApartment.projectionIMG) errors.push('projection is empty');
        else if(typeof newApartment.projectionIMG !== 'string') errors.push('images.projection is not string');

        if(!newApartment.floorIMG) errors.push('floor is empty');
        else if(typeof newApartment.floorIMG !== 'string') errors.push('images.floor is not string');

        if(errors.length === 0) {
            const statusTrue: PostStatus = {
                isSuccess: true,
                id: 404,
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

    async apartmentRemove(id: number): Promise<PostStatus> {
        const find: ApartmentsEntity = await ApartmentsEntity.findOne(id);

        if(find) {
            await ApartmentsEntity.remove(find);
            const statusTrue: PostStatus = {
                isSuccess: true,
                id: id,
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

    async apartmentPut(id: number, apartmentDataPart): Promise<PostStatus>  {
        const find: ApartmentData = await ApartmentsEntity.findOne(id);
        if(find) {
            await ApartmentsEntity.update(find.id, apartmentDataPart)
            const statusTrue: PostStatus = {
                isSuccess: true,
                id: id,
            }
            return statusTrue;
        } else {
            const statusFalse: PostStatus = {
                isSuccess: false,
                errors: [`${id} not found`],
            }
            return statusFalse;
        }
    }
}
