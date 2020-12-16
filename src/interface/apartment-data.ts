export enum PurposeType {
    any = 'Dowolne',
    gastronomy = 'Gasrtonomia',
    textiles = 'Tekstylia',
}

export enum ApartmentStatus {
    free  = 'Wolny',
    booked  = 'Zarezerwowany',
    sold = 'Sprzedany',
}

export interface ApartmentData {
    name: string,
    id: number,
    size: number,
    price: number,
    floor: number,
    purpose: PurposeType,
    status: ApartmentStatus,
    projectionIMG: string,
    floorIMG: string,
    image?: ApartmentImages,
}

export interface ApartmentImages {
    id: number
    projection: string,
    floor: string,
}