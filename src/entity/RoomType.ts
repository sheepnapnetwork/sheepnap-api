import { Entity,  PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Property } from "./Property";

@Entity()
export class RoomType {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code : number;  
    
    @Column()
    description : string; 
    
    @ManyToOne(() => Property, property => property.RoomType)
    property: Property;
}