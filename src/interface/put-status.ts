export enum StatusType {
    changed = 'changed',
    notExist = 'key does not exist',
}


export interface PutStatus {
    name?: StatusType,
    id?: StatusType,
    size?: StatusType,
    price?: StatusType,
    floor?: StatusType,
    purpose?: StatusType,
    status?: StatusType,
    images?: StatusType,
}