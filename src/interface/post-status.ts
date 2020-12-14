import {ApartmentData} from "./apartment-data";

export type PostStatus = {
    isSuccess: true,
    items?: ApartmentData[],
    pagesCount?: number,
} | {
    isSuccess: false,
    errors: string[],
    pagesCount?: number,
}