import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApartmentData, ApartmentStatus, PurposeType} from "../interface/apartment-data";

@Entity()
export class ApartmentsEntity extends BaseEntity implements ApartmentData {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    floor: number;
    @Column()
    price: number;
    @Column()
    purpose: PurposeType;
    @Column({
        type: 'float',
        precision: 6,
        scale: 2,
    })
    size: number;
    @Column()
    status: ApartmentStatus;
    @Column()
    projectionIMG: string;
    @Column()
    floorIMG: string;
}