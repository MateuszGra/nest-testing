import { Injectable } from '@nestjs/common';
import {ApartmentData, ApartmentStatus} from "../interface/apartment-data";
import {RespStatus} from "../interface/resp-status";
import {ApartmentsEntity} from "./apartments.entity";
import {Like} from "typeorm";


@Injectable()
export class ApartmentsService {

    async apartmentsAll(): Promise<RespStatus> {
        const resp: ApartmentData[] = await ApartmentsEntity.find({
            order: {
                status: 'ASC',
                price: 'ASC',
            },
        });
        if (resp[0]) {
            return {
                isSuccess: true,
                items: resp,
            }
        } else {
            return {
                isSuccess: false,
                errors: [`not found`],
            }
        }
    }

    async apartmentsPage(currentPage: number = 1): Promise<RespStatus> {
        const maxPerPage = 3;

        const [items, count] = await ApartmentsEntity.findAndCount({
            skip: maxPerPage * (currentPage - 1),
            take: maxPerPage,
            order: {
                price: 'ASC'
            },
        })

        const pagesCount = Math.ceil(count / maxPerPage);

        if(items[0]){
            return {
                isSuccess: true,
                pagesCount: pagesCount,
                items: items,
            }
        } else {
            return {
                isSuccess: false,
                pagesCount: pagesCount,
                errors: [`page ${currentPage} not found`],
            }
        }

    }

    async searchName(searchTerm: string): Promise<RespStatus> {
        const res: ApartmentData[] = await ApartmentsEntity.find({
            where:{
                name: Like(`%${searchTerm}%`),
            },
            order: {
                price: 'ASC'
            },
        });

        if(res[0]){
            return {
                isSuccess: true,
                items: res,
            }
        } else {
            return {
                isSuccess: false,
                errors: [`${searchTerm} not found`],
            }
        }

    }

    async apartmentsSingle(id: number): Promise<RespStatus>{
        const res: ApartmentData = await ApartmentsEntity.findOne(id);
        if(res) {
            return {
                isSuccess: true,
                items: [res],
            }
        } else {
            return {
                isSuccess: false,
                errors: [`${id} not found`],
            }
        }
    }

    async apartmentPush(newApartment: ApartmentsEntity): Promise<RespStatus> {
        const status: RespStatus = await this.postValidation(newApartment);
        if (status.isSuccess === true) await ApartmentsEntity.save(newApartment);
        return status;
    }

    async postValidation(newApartment: ApartmentData): Promise<RespStatus> {
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
            return {
                isSuccess: true,
            }
        } else {
            return {
                isSuccess: false,
                errors: errors,
            }
        }

    }

    async apartmentRemove(id: number): Promise<RespStatus> {
        const find: ApartmentsEntity = await ApartmentsEntity.findOne(id);

        if(find) {
            await ApartmentsEntity.remove(find);
            return {
                isSuccess: true,
            }
        }
        else {
            return {
                isSuccess: false,
                errors: [`${id} not found`],
            }
        }

    }

    async apartmentPut(id: number, apartmentDataPart): Promise<RespStatus>  {
        const find: ApartmentData = await ApartmentsEntity.findOne(id);
        if(find) {
            await ApartmentsEntity.update(find.id, apartmentDataPart)
            return {
                isSuccess: true,
            }
        } else {
            return {
                isSuccess: false,
                errors: [`${id} not found`],
            }
        }
    }
}
