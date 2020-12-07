import {ApartmentStatus, PurposeType} from "../../interface/apartment-data";

export class ApartmentDto {
    name: string;
    id: string;
    size: number;
    price: number;
    floor: number;
    purpose: PurposeType;
    status: ApartmentStatus;
    images: {
        projection: string;
        floor: string;
    }
}