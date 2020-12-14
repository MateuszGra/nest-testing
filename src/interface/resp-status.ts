import {ApartmentData} from "./apartment-data";

export type RespStatus = {
    isSuccess: true,
    items?: ApartmentData[],
    pagesCount?: number,
} | {
    isSuccess: false,
    errors: string[],
    pagesCount?: number,
}