import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Property } from "./Property";

@Entity()
export class PropertyImage
{
    @PrimaryGeneratedColumn()
    id : Number

    @Column()
    url : string;

    @Column()
    priority : Number;

    @Column()
    title : string;

    @ManyToOne(() => Property, property => property.Images)
    property: Property;
}