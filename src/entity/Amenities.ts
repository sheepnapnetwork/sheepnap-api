import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Property } from "./Property";

@Entity()
export class Amenity
{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    code : number;

    @ManyToOne(() => Property, property => property.Amenities)
    property: Property;
}