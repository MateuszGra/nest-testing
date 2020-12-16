import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApartmentData, ApartmentStatus, PurposeType } from "../interface/apartment-data";
import { ApartmentsImagesEntity } from "./apartments-images.entity";

@Entity()
export class ApartmentsEntity extends BaseEntity implements ApartmentData {
    @PrimaryGeneratedColumn()
    id: number;
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

    @OneToOne(() => ApartmentsImagesEntity)
    @JoinColumn()
    images: ApartmentsImagesEntity;
}