import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApartmentImages } from "../interface/apartment-data";
import { ApartmentsEntity } from "./apartments.entity";


@Entity()
export class ApartmentsImagesEntity extends BaseEntity implements ApartmentImages {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    projection: string;
    @Column()
    floor: string;

    @OneToOne( () => ApartmentsEntity, entity => entity.images)
    apartments: ApartmentsEntity;
}